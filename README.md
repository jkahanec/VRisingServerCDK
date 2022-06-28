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





## TODO: Fix Connect to instance in AWS Console

Currently getting:
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



# TODO List:
1. Get SSM agent working (used to conenct to the instance for debugging issues throughout the rest of the steps)
2. Put V rising Server in S3 so the ec2 instance can pull it from there
3. Write PowerShell script to pull the server software(Zip file of the server downloaded from steam?) and start the server
4. Probably fix security group errors/issues from connecting over the internet. (I did nothing except put the instance in a public subnet)
5. Update the UserData to run the game server script on every start/stop (so I can start the instance whenever I want to save money, and all i have to do is start it to make it playable)
6. Script for starting/stoping the instance. Ideally works for any instance ID (or references the instance in some other static way)

### Nice to haves
1. Easier trigger mechanism for restarting the instance/running the script. Ideally i dont have to log into the console and start the instance; something from my phone would be better.

## Notes:
1. Server settings are in: `C:\Program Files (x86)\Steam\steamapps\common\VRisingDedicatedServer\VRisingServer_Data\StreamingAssets\Settings`
