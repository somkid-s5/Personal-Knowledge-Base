output "global_cluster_id" {
  value = aws_rds_global_cluster.thaipay.id
}

output "primary_cluster_endpoint" {
  value = aws_rds_cluster.primary.endpoint
}

output "secondary_cluster_endpoint" {
  value = aws_rds_cluster.secondary.endpoint
}

output "primary_bucket_name" {
  value = aws_s3_bucket.primary_assets.id
}

output "secondary_bucket_name" {
  value = aws_s3_bucket.secondary_assets.id
}
