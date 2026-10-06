import boto3
import json

def remediate_exposed_key(event, context):
    """
    SOAR Playbook: Automatically revokes access for an exposed IAM key.
    Triggered by: GuardDuty or AWS Health (Secrets Manager).
    """
    iam = boto3.client('iam')
    access_key_id = event['detail']['additionalLearnMoreContext']['accessKeyId']
    user_name = event['detail']['resource']['accessKeyDetails']['userName']
    
    print(f"--- SOAR Action: Revoking Exposed Key {access_key_id} for user {user_name} ---")
    
    # 1. Deactivate the key
    iam.update_access_key(
        UserName=user_name,
        AccessKeyId=access_key_id,
        Status='Inactive'
    )
    
    # 2. Attach a "DenyAll" policy to the user (Safety first)
    iam.put_user_policy(
        UserName=user_name,
        PolicyName='ExposedKeyQuarantine',
        PolicyDocument=json.dumps({
            "Version": "2012-10-17",
            "Statement": [{"Effect": "Deny", "Action": "*", "Resource": "*"}]
        })
    )
    
    # 3. Notify Security Team via Slack
    print(f"[SUCCESS] User {user_name} quarantined. Key {access_key_id} deactivated.")

if __name__ == "__main__":
    # Mock event
    mock_event = {
        'detail': {
            'additionalLearnMoreContext': {'accessKeyId': 'AKIAEXAMPLE'},
            'resource': {'accessKeyDetails': {'userName': 'dev-user-01'}}
        }
    }
    remediate_exposed_key(mock_event, None)
