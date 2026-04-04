---
title: Performance Profiler
description: Rolling metrics, P95 latency, cache hit rates, and adaptive configuration based on system capabilities.
---

The Performance Profiler measures and analyzes CodeBuddy's operational performance — search latency, indexing throughput, memory usage, cache efficiency, and error rates. It provides both real-time alerts and on-demand performance reports.

## Metrics tracked

| Metric                  | Window size | What it measures                           |
| ----------------------- | ----------- | ------------------------------------------ |
| **Search latency**      | 100 samples | Time to complete a vector/hybrid search    |
| **Indexing throughput** | 50 samples  | Files processed per second during indexing |
| **Memory usage**        | 20 samples  | Heap memory consumed by the extension      |
| **Cache hit rate**      | 100 samples | Percentage of queries served from cache    |
| **Error rate**          | 100 samples | Percentage of operations that fail         |

All metrics use a `RollingAverage` — a fixed-size window that evicts the oldest sample when full.

## Performance reports

A performance report includes:

| Field                   | Calculation               |
| ----------------------- | ------------------------- |
| `avgSearchLatency`      | Mean of last 100 searches |
| `p95SearchLatency`      | 95th percentile latency   |
| `avgIndexingThroughput` | Mean files/sec throughput |
| `avgMemoryUsage`        | Mean heap usage in MB     |
| `cacheHitRate`          | Mean cache hit percentage |
| `errorRate`             | Mean error percentage     |

## Alerts

The profiler generates alerts when metrics cross thresholds:

| Alert type            | Severity | Trigger                                  |
| --------------------- | -------- | ---------------------------------------- |
| `HIGH_SEARCH_LATENCY` | warning  | P95 search latency exceeds threshold     |
| `HIGH_MEMORY_USAGE`   | warning  | Average memory exceeds system limit      |
| `HIGH_ERROR_RATE`     | critical | Error rate exceeds acceptable threshold  |
| `LOW_THROUGHPUT`      | info     | Indexing throughput drops below baseline |

## Adaptive configuration

The profiler auto-configures operational parameters based on system capabilities:

| System tier                     | Embedding batch | Cache size | Search timeout | Indexing concurrency |
| ------------------------------- | --------------- | ---------- | -------------- | -------------------- |
| **High** (≥16 GB RAM, ≥8 cores) | 20              | 10,000     | 10s            | 8                    |
| **Medium** (8–16 GB, 4–8 cores) | 10              | 5,000      | 15s            | 4                    |
| **Low** (<8 GB or <4 cores)     | 5               | 2,000      | 20s            | 2                    |

System detection uses `os.totalmem()` and `os.cpus().length`.

## Measurement API

Wrap any operation to automatically record its performance:

```typescript
const result = await profiler.measure("search", async () => {
  return vectorDb.search(query);
});
```

This records:

- Duration (milliseconds)
- Memory delta (heap before vs. after)
- Success/failure status

Failed operations are counted toward the error rate metric.
