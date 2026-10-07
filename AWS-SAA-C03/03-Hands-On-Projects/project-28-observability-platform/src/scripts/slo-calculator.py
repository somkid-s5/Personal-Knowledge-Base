import requests
import time

def get_error_budget(prometheus_url, slo_objective, window_days):
    """
    Calculates remaining error budget based on Prometheus SLI metrics.
    """
    # Simplified mock query for the logic
    query = 'avg_over_time(sli_success_rate[{}d])'.format(window_days)
    
    # In a real scenario, we'd use the Prometheus API
    # response = requests.get(f"{prometheus_url}/api/v1/query", params={'query': query})
    # actual_sli = float(response.json()['data']['result'][0]['value'][1])
    
    actual_sli = 0.9995  # Example 99.95% success
    
    error_budget_total = 1.0 - slo_objective
    actual_error_rate = 1.0 - actual_sli
    
    budget_remaining_percent = (1.0 - (actual_error_rate / error_budget_total)) * 100
    
    print(f"SLO Objective: {slo_objective * 100}%")
    print(f"Actual SLI (Last {window_days} days): {actual_sli * 100}%")
    print(f"Error Budget Remaining: {budget_remaining_percent:.2f}%")

if __name__ == "__main__":
    get_error_budget("http://prometheus:9090", 0.999, 28)
