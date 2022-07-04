# VRisingServerCDK

A CDK project used to spin up an EC2 instance running Windows to run a V Rising Server.

## Deploying the stack
1. Set up AWS credentials 
2. `cdk deploy VRisingServerCdkStack`
## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Common Issues

```
We weren't able to connect to your instance. Common reasons for this include:
SSM Agent isn't installed on the instance. You can install the agent on both Windows instances and Linux instances.
The required IAM instance profile isn't attached to the instance. You can attach a profile using AWS Systems Manager Quick Setup.
Session Manager setup is incomplete. For more information, see Session Manager Prerequisites.
```
https://docs.aws.amazon.com/en_us/console/systems-manager/agent-windows
https://docs.aws.amazon.com/en_us/console/systems-manager/qs-instance-profile
https://docs.aws.amazon.com/en_us/console/systems-manager/qs-quick-setup
https://docs.aws.amazon.com/en_us/console/systems-manager/session-manager-prerequisites

When connecting to the instance in the console

Steps To Fix 
1. Navigate to [AWS Systems Manager](https://us-west-2.console.aws.amazon.com/systems-manager/home?region=us-west-2) in the console
2. Click `Get Started With Systems Manager`
3. Run the Quick Setup for Systems Manager

# TODO List:
1. Create a backup for the instance drive to s3
2. write save script. for now: `Write-S3Object -BucketName v-rising-server-cdk-zip -Key 'AutoSave_xx.zip' -File .\AutoSave_xx.zip` 
3. Update the UserData to run the game server script on every start/stop (so I can start the instance whenever I want to save money, and all i have to do is start it to make it playable)
4. Script for starting/stoping the instance. Ideally works for any instance ID (or references the instance in some other static way)

### Nice to haves
1. Easier trigger mechanism for restarting the instance/running the script. Ideally i dont have to log into the console and start the instance; something from my phone would be better.

## Notes:
1. Server settings are in: `C:\Program Files (x86)\Steam\steamapps\common\VRisingDedicatedServer\VRisingServer_Data\StreamingAssets\Settings`

## Playing

The Server ID used to connect can be obtained from using SSM to run:
`Get-Content -Path .\VRisingServer.log | Select-String -Pattern "GameServer ID:"`

With that Server ID which should look like:
`90160xxxxxxx04036`
Connect from the V Rising Game by selecting
1. Play
2. Online Play
3. Find Servers (small buttom in bottom right)
4. Display all Servers & Settings
5. Direct Connect
6. Enter the ID and press Connect

If that doesn't work, double check the server is running on the host with: 
`get-process VRisingServer`
If it's running you should see:
```
Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
    123      13  1234567    1234567   1,004.86   1234   0 VRisingServer
```
