---
title: Cost Tracking
description: Per-model token tracking, USD cost estimation, and configurable spending limits.
---

The `CostTrackingService` monitors token usage and computes estimated costs for every API call. It maintains pricing tables for 30+ models across 9 providers and produces per-conversation, per-provider, and aggregate summaries.

## How it works

Every API call to an LLM provider consumes tokens. CodeBuddy tracks:

- **Input tokens** — The prompt and context sent to the model
- **Output tokens** — The model's response
- **Estimated cost** — Computed with 6-decimal-place precision using per-model pricing tables

Cost is calculated as:

$$\text{cost} = \frac{\text{input tokens} \times \text{input price}}{1{,}000{,}000} + \frac{\text{output tokens} \times \text{output price}}{1{,}000{,}000}$$

## Viewing costs

Cost information is displayed at three levels:

- **Per message** — Token count shown below each response
- **Per conversation** — Cumulative cost for the current thread
- **Aggregate summary** — Total cost broken down by provider and model

## Setting cost limits

Prevent unexpected charges with a per-task cost limit:

```json
{
  "codebuddy.costLimit": 1.0
}
```

When the limit is reached, CodeBuddy pauses and asks if you want to continue.

## Pricing by provider

Approximate per-million-token pricing (mid-2025):

| Provider      | Model             | Input  | Output |
| ------------- | ----------------- | ------ | ------ |
| **Anthropic** | Claude Sonnet 4   | $3.00  | $15.00 |
| **Anthropic** | Claude Opus 4     | $15.00 | $75.00 |
| **Anthropic** | Claude Haiku      | $0.25  | $1.25  |
| **OpenAI**    | GPT-4o            | $2.50  | $10.00 |
| **OpenAI**    | GPT-4o-mini       | $0.15  | $0.60  |
| **OpenAI**    | o3-mini           | $1.10  | $4.40  |
| **Google**    | Gemini 2.5 Pro    | $1.25  | $10.00 |
| **Google**    | Gemini 2.5 Flash  | $0.15  | $0.60  |
| **Groq**      | Llama 3.3 70B     | $0.59  | $0.79  |
| **DeepSeek**  | DeepSeek Chat     | $0.27  | $1.10  |
| **DeepSeek**  | DeepSeek Reasoner | $0.55  | $2.19  |
| **Qwen**      | Qwen Plus         | $0.80  | $2.00  |
| **xAI**       | Grok              | $5.00  | $15.00 |
| **Ollama**    | Local models      | Free   | Free   |

When a model isn't in the pricing table, a conservative fallback of $3.00 / $15.00 per million tokens is used.

## Cost summary API

The service exposes structured cost data:

```typescript
interface ICostSummary {
  totals: {
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
    requestCount: number;
  };
  providers: Array<{
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
    requestCount: number;
  }>;
  conversations: Array<{
    threadId: string;
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
    requestCount: number;
  }>;
}
```

## Tips for reducing costs

- **Use smaller models for simple tasks** — GPT-4o-mini or Gemini Flash for file renames, formatting, simple edits
- **Use local models** — Ollama for tasks that don't need frontier intelligence
- **Set project rules** — Clear rules reduce unnecessary iterations and context growth
- **Set a cost limit** — Use `codebuddy.costLimit` as a safety net
- **Monitor context growth** — Long conversations accumulate tokens. Start new conversations for unrelated tasks
