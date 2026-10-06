import boto3
import json

ec2 = boto3.client('ec2')

def lambda_handler(event, context):
    # Triggered by EventBridge from GuardDuty 'UnauthorizedAccess:EC2/SSHBruteForce'
    detail = event['detail']
    finding_type = detail['type']
    instance_id = detail['resource']['instanceDetails']['instanceId']
    remote_ip = detail['service']['action']['networkConnectionAction']['remoteIpDetails']['ipAddressV4']
    
    print(f"Found {finding_type} on {instance_id} from {remote_ip}")
    
    # In real life: Update NACL or Security Group to block the IP
    # This is a dangerous operation - usually we isolate the instance
    ec2.create_tags(
        Resources=[instance_id],
        Tags=[{'Key': 'SecurityStatus', 'Value': 'Isolate'}]
    )
    
    return {"status": "Instance tagged for isolation"}
