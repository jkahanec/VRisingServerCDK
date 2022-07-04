import { InstanceClass, InstanceSize, InstanceType, WindowsVersion } from 'aws-cdk-lib/aws-ec2';

// Game Instance Constants
export const INSTANCE_SIZE = InstanceSize.LARGE;
export const INSTANCE_CLASS = InstanceClass.C4;
export const INSTANCE_TYPE = InstanceType.of(INSTANCE_CLASS, INSTANCE_SIZE);
export const WINDOWS_VERSION = WindowsVersion.WINDOWS_SERVER_2019_ENGLISH_FULL_BASE;

// VPC Constants
export const VPC_CIDR = '10.0.0.0/26';
// We only have one host, so we'll make a cheap 1 AZ VPC
export const MAX_AZS = 3;
export const CIDR_MASK = 27;

// AWS Region to spin up the VPC/ec2 instance in
export const REGION = 'us-west-2';

// S3 Bucket where the server binary lives
export const SERVER_S3_BUCKET_NAME = 'v-rising-server-cdk-zip';

// Name of the Zip of the Dedicated Server Files
export const GAME_SERVER_S3_OBJECT_NAME = 'VRisingDedicatedServer.zip';

// Script used for starting the server reference: start_server_example.bat in the zip
export const START_SCRIPT = 'start_server.bat';
