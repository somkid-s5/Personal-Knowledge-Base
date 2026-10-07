-- 1. Create External Table (Simplified)
CREATE EXTERNAL TABLE IF NOT EXISTS cur_data (
  identity_line_item_id string,
  line_item_usage_start_date timestamp,
  line_item_usage_end_date timestamp,
  line_item_product_code string,
  line_item_usage_type string,
  line_item_unblended_cost double,
  line_item_resource_id string,
  resource_tags_user_team string,
  resource_tags_user_service string,
  resource_tags_user_environment string
)
PARTITIONED BY (year string, month string)
STORED AS PARQUET
LOCATION 's3://thairetail-billing-data-123456789012/cur/main-cur/main-cur/';

-- 2. Daily Spend Trend
SELECT 
    CAST(line_item_usage_start_date AS DATE) as usage_date,
    SUM(line_item_unblended_cost) as total_cost
FROM cur_data
WHERE year = '2024' AND month = '03'
GROUP BY 1
ORDER BY 1;

-- 3. Top 10 Most Expensive Resources
SELECT 
    line_item_resource_id,
    line_item_product_code,
    SUM(line_item_unblended_cost) as total_cost
FROM cur_data
WHERE year = '2024' AND month = '03'
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 10;
