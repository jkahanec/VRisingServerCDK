import { InstanceClass, InstanceSize, InstanceType, WindowsVersion } from 'aws-cdk-lib/aws-ec2';

// Game Instance Constants
export const INSTANCE_SIZE = InstanceSize.LARGE;
export const INSTANCE_CLASS = InstanceClass.C4;
export const INSTANCE_TYPE = InstanceType.of(INSTANCE_CLASS, INSTANCE_SIZE);
export const WINDOWS_VERSION = WindowsVersion.WINDOWS_SERVER_2019_ENGLISH_FULL_BASE;

// VPC Constants
export const VPC_CIDR = '10.0.0.0/26';
// doesn't matter much, since we'll most likely only have one instance,
// but we'll take three subnets just in case
export const MAX_AZS = 3;
export const CIDR_MASK = 27;

// AWS Region to spin up the VPC/ec2 instance in
export const REGION = 'us-west-2';