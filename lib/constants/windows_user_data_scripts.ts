import { SERVER_S3_BUCKET_NAME , GAME_SERVER_S3_OBJECT_NAME, START_SCRIPT} from "./constants";
export const INSTALL_SERVER_SCRIPT = `
<powershell>
Read-S3Object -BucketName ${SERVER_S3_BUCKET_NAME} -Key ${GAME_SERVER_S3_OBJECT_NAME} -File ${GAME_SERVER_S3_OBJECT_NAME}
Expand-Archive -path ${GAME_SERVER_S3_OBJECT_NAME} -DestinationPath ".\\"
Read-S3Object -BucketName ${SERVER_S3_BUCKET_NAME} -Key ${START_SCRIPT} -File C:\\Windows\\system32\\${START_SCRIPT}
</powershell>
<powershell>
cd .\\VRisingDedicatedServer\\
set SteamAppId=1604030
start-process powershell -Verb runAs -ArgumentList "C:\\Windows\\system32\\${START_SCRIPT}"
</powershell>
<persist>true</persist>
`;
