import { Stack, StackProps } from 'aws-cdk-lib';
import { Instance, SubnetType, UserData, Vpc, WindowsImage } from 'aws-cdk-lib/aws-ec2';
import { ManagedPolicy, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CIDR_MASK, INSTANCE_TYPE, MAX_AZS, SERVER_S3_BUCKET_NAME, VPC_CIDR, WINDOWS_VERSION } from '../constants/constants';
import { INSTALL_SERVER_SCRIPT } from '../constants/windows_user_data_scripts';

export class VRisingServerCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The VPC where we'll stick the server
    const gameServerVPC = new Vpc(this, 'GameServerVPC', {
      cidr: VPC_CIDR,
      maxAzs: MAX_AZS,
      subnetConfiguration: [
        {
          subnetType: SubnetType.PUBLIC,
          name: 'Ingress',
          cidrMask: CIDR_MASK,
        },
      ]
    });

    // The script that will start the game server
    const userData = UserData.custom(INSTALL_SERVER_SCRIPT);

    // The server that will host the game for us
    const gameEC2Server = new Instance(this, 'GameServer', {
      vpc: gameServerVPC,
      instanceType: INSTANCE_TYPE,
      machineImage: new WindowsImage(WINDOWS_VERSION),
      userData: userData,
    });

    // Policy that allows Connection to the instance through AWS Session Manager
    gameEC2Server.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    // Policy that allows the server to retrieve the server zip from S3
    const gameServerS3RetrievalPolicy = new Policy(this, 'GameServerS3RetrievalPolicy', {
      policyName: 'GameServerS3RetrievalPolicy',
      statements: [new PolicyStatement({
        actions: ['s3:GetObject',
          's3:ListBucket'],
        resources: [
          `arn:aws:s3:::${SERVER_S3_BUCKET_NAME}/*`,
          `arn:aws:s3:::${SERVER_S3_BUCKET_NAME}`
        ],
      })],

    });
    gameEC2Server.role.attachInlinePolicy(gameServerS3RetrievalPolicy);

    // Some code to create the bucket and deploy it. I did this part by hand since 
    // I was creating and deleting the stack constantly, but this could be done (probably in a separate stack) like this:

    // const vRisingServerBucket = new Bucket(this, SERVER_S3_BUCKET_NAME);
    // new BucketDeployment(this, 'DeployServerFiles', {
    //   sources: [Source.asset(GAME_SERVER_S3_OBJECT_NAME)],
    //   destinationBucket: vRisingServerBucket,
    // });
    // new BucketDeployment(this, 'DeployServerFiles', {
    //   sources: [Source.asset(START_SCRIPT)],
    //   destinationBucket: vRisingServerBucket,
    // });
  }
}
