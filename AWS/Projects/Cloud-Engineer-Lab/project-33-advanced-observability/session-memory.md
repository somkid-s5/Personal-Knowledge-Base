# Session Memory & Architectural Decisions

## Active Role
- **Role**: SRE & Observability Architect
- **Responsibility**: Designing and implementing standard full-stack distributed tracing and monitoring pipelines.

## Key Architectural Decisions
1. **OpenTelemetry Adoption**:
   - Standards-based context propagation using OpenTelemetry SDK in microservices.
   - Using OTel Collector in a sidecar pattern to buffer and preprocess traces before sending them to the backend.
2. **OpenSearch Storage**:
   - Storing traces in Amazon OpenSearch Service for indexing and TraceQL querying capabilities.
3. **High-End Topology Diagram**:
   - Generated a dark-mode architecture image mapping out: User -> Service A -> Service B -> DB and their sidecar telemetry exporters.
