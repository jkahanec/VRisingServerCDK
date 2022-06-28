import { Stack, StackProps, App, } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {ManagedPolicy, Policy} from 'aws-cdk-lib/aws-iam';
import { CIDR_MASK, INSTANCE_TYPE, MAX_AZS, VPC_CIDR, WINDOWS_VERSION } from '../constants/constants';
import { Construct } from 'constructs';
import { INSTALL_SERVER_SCRIPT } from '../constants/windows_user_data_scripts'

export class VRisingServerCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The VPC where we'll stick the server
    const gameServerVPC = new ec2.Vpc(this, 'GameServerVPC', {
      cidr: VPC_CIDR,
      maxAzs: MAX_AZS,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'Ingress',
          cidrMask: CIDR_MASK,
        },
      ]
    });

    // The script that will start the game server
    const userData = ec2.UserData.custom(INSTALL_SERVER_SCRIPT);

    // The server that will host the game for us
    const gameEC2Server = new ec2.Instance(this, 'GameServer', {
      vpc: gameServerVPC,
      instanceType: INSTANCE_TYPE,
      machineImage: new ec2.WindowsImage(WINDOWS_VERSION),
      // userData: userData,
    });

    gameEC2Server.addToRolePolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
  }
}
