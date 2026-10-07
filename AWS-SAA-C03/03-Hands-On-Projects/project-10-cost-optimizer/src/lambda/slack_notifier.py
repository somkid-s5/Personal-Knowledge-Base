import json
import urllib3
import os

def lambda_handler(event, context):
    slack_url = os.environ.get('SLACK_WEBHOOK_URL')
    http = urllib3.PoolManager()
    
    # SNS sends message as a string inside 'Message' key
    sns_message = json.loads(event['Records'][0]['Sns']['Message'])
    title = sns_message.get('title', 'AWS Cost Alert')
    
    blocks = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": f"🚨 {title}"
            }
        }
    ]
    
    if 'total_savings' in sns_message:
        blocks.append({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*Potential Savings:* `{sns_message['total_savings']}`"
            }
        })

    # Add findings as fields or sections
    # ... logic to build Block Kit ...
    
    msg = {
        "blocks": blocks,
        "text": title # Fallback text
    }
    
    encoded_msg = json.dumps(msg).encode('utf-8')
    resp = http.request('POST', slack_url, body=encoded_msg)
    
    return {
        'message': sns_message,
        'status_code': resp.status
    }
