import subprocess
import json
import boto3
import os

def lambda_handler(event, context):
    sns = boto3.client('sns')
    sns_topic_arn = os.environ.get('SNS_TOPIC_ARN')
    
    # In a real Lambda, you would need to bundle the terragrunt and terraform binaries
    # or use a container image for the Lambda.
    
    envs = ['dev', 'prod']
    drifts = []
    
    for env in envs:
        print(f"Checking drift for {env}...")
        try:
            # -detailed-exitcode returns 2 if there is a diff
            result = subprocess.run(
                ["terragrunt", "run-all", "plan", "-detailed-exitcode", "--terragrunt-non-interactive"],
                cwd=f"./terragrunt/{env}",
                capture_output=True,
                text=True
            )
            
            if result.returncode == 2:
                drifts.append(env)
                print(f"DRIFT DETECTED IN {env}!")
        except Exception as e:
            print(f"Error running terragrunt for {env}: {e}")
            
    if drifts:
        message = f"Infrastructure drift detected in the following environments: {', '.join(drifts)}. Please review the latest PRs or manual changes."
        sns.publish(
            TopicArn=sns_topic_arn,
            Subject="Terraform Drift Alert",
            Message=message
        )
        
    return {
        'statusCode': 200,
        'body': json.dumps(f"Scan complete. Drifts found in: {drifts}")
    }
