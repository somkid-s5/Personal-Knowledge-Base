import subprocess
import json
import urllib.request
import os

SLACK_WEBHOOK_URL = os.environ.get('SLACK_WEBHOOK_URL')

def send_slack_alert(env, drift_details):
    if not SLACK_WEBHOOK_URL:
        print("SLACK_WEBHOOK_URL not set. Printing to stdout instead.")
        print(f"DRIFT DETECTED in {env}:\n{drift_details}")
        return

    payload = {
        "text": f"⚠️ *Terraform Drift Detected* in `{env}` environment!\n```\n{drift_details}\n```"
    }
    
    req = urllib.request.Request(
        SLACK_WEBHOOK_URL, 
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)

def run_plan(env_dir):
    try:
        print(f"Running terragrunt plan in {env_dir}...")
        result = subprocess.run(
            ["terragrunt", "plan", "-detailed-exitcode", "-no-color"],
            cwd=env_dir,
            capture_output=True,
            text=True
        )
        
        # detailed-exitcode: 0 = no changes, 1 = error, 2 = changes present
        if result.returncode == 2:
            return True, result.stdout
        elif result.returncode == 1:
            return False, f"Error running plan:\n{result.stderr}"
            
        return False, None
        
    except FileNotFoundError:
        return False, "terragrunt command not found"

if __name__ == "__main__":
    # In a real scenario, we'd iterate over all env dirs
    environments = [
        "../terragrunt/dev/networking",
        "../terragrunt/prod/networking"
    ]
    
    for env in environments:
        if os.path.exists(env):
            has_drift, details = run_plan(env)
            if has_drift:
                send_slack_alert(env, details)
            else:
                print(f"{env}: No drift detected or error occurred.")
        else:
            print(f"Directory {env} not found, skipping.")
