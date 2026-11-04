# Production AI Systems & Infrastructure Engineering: Coverage Map

This document maps the uploaded 12-module Production AI Systems & Infrastructure Engineering syllabus into the unified AI Engineering curriculum. The existing AI/ML foundations stage is retained as prerequisite knowledge, so the unified track has 13 stages in total.

## Structure

- Existing published lessons remain published with their lesson IDs unchanged.
- Existing lessons are reassigned to the appropriate stage using `stageId`.
- New lessons are added as `upcoming` sections. They must be authored and reviewed before being marked published.
- The Database Engineering track remains the canonical deep-dive for general database concepts. The AI track adds AI-platform-specific application and links learners to those foundations instead of duplicating the entire database curriculum.
- The uploaded document is the source for the topic list and assessment mapping below. Lesson titles and sequencing are curriculum design decisions.

## Uploaded syllabus to unified AI Engineering stages

| Uploaded module | Unified AI Engineering stage | Coverage and planned lessons |
|---|---|---|
| 1. Python Backend Engineering Fundamentals | Python Backend Engineering Fundamentals | Existing Python and data-structure lessons; add runtime/object lifecycle, exceptions/types/resource management, GIL/workload types, profiling |
| 2. Asynchronous Programming and Concurrency | Asynchronous Programming and Concurrency | Existing async/await and concurrency lessons; add asyncio scheduling, cancellation propagation, thread-pool lifecycle, locks/semaphores/queues, backpressure, graceful shutdown |
| 3. Resilient Backend Systems | Resilient Backend Systems | Add LLM gateway, provider prioritization/fallback, retry budgets, jitter, deadlines, circuit breakers, rate limits, bulkheads, idempotency, deduplication, load shedding, health checks |
| 4. LLM Inference Fundamentals | LLM Inference Fundamentals | Add transformer inference, tokenization/token IDs, embeddings/positional encoding, causal attention, next-token generation, prefill/decode, weights/activations/KV memory, bandwidth/compute, quantization, parallelism |
| 5. LLM Serving Infrastructure and vLLM | LLM Serving Infrastructure and vLLM | Add model loading, static/continuous batching, scheduling, sequence management, KV cache, PagedAttention, prefix caching, eviction, chunked prefill, serving limits, speculative decoding, streaming, multi-GPU and multi-model serving |
| 6. LLM Performance Engineering and Observability | LLM Performance Engineering and Observability | Add TTFT/inter-token/end-to-end latency, percentiles, queueing, Little's Law, GPU/CPU/network bottlenecks, token throughput, cost per request/token, tracing, logs, metrics, SLOs, load tests and capacity planning |
| 7. LLM Evaluation and Quality Engineering | LLM Evaluation and Quality Engineering | Existing ML evaluation foundations; add golden sets, exact/semantic metrics, LLM judges, pairwise comparison, position/verbosity/self-preference bias, judge reliability, inter-rater agreement, human rubrics, confidence intervals, A/B and regression tests, factuality, RAG and agent trajectory evaluation, contamination |
| 8. Agentic Systems and Workflow Engines | Agentic Systems and Workflow Engines | Existing background-job and state-related foundations; add tool calling, agent state, state machines, conditional/parallel workflows, durable execution, checkpointing, step retries, idempotent tools, human approvals, multi-agent orchestration, versioning, recovery, audit trails, memory and runaway prevention |
| 9. Database Engineering for AI Platforms | Database Engineering for AI Platforms | Existing Database Engineering track is canonical for relational fundamentals, internals, indexes, ACID, isolation, query plans, caching, migrations, replication, partitioning and sharding. Add AI-platform-specific modelling, connection pools, event/audit records, multi-tenancy, retention and workload design |
| 10. Distributed Systems and Scalability | Distributed Systems and Scalability | Add service boundaries, sync/async communication, REST/RPC/messaging, queues/Kafka, delivery semantics, duplicate handling, ordering/partitioning, sagas, consistency, CAP limitations, scaling, load balancing, discovery, replication, failover, tracing and multi-region fundamentals |
| 11. Production Deployment and Reliability | Production Deployment and Reliability | Add Docker, configuration/secrets, CI/CD, Kubernetes, autoscaling, health/readiness, rolling/canary deployments, rollback, feature flags, incidents, RCA, on-call, resource limits, security, abuse protection and cost controls |
| 12. Systems Design and Architecture Interviews | Systems Design and Architecture Interviews | Add requirements, NFRs, traffic/storage estimates, APIs, data models, architecture boundaries, sync/async flows, failure analysis, reliability, performance, security, observability, cost and architecture evolution |

## Existing published coverage

The following 20 lesson IDs are retained as published:
- AI/ML foundations: `ai-vs-ml-deep-learning-generative-ai`, `machine-learning-types`, `classification-regression-clustering`, `training-validation-test-splits`, `features-labels-parameters-hyperparameters`, `feature-engineering-preprocessing`, `loss-optimization-gradient-descent`, `overfitting-underfitting-regularization`, `bias-variance-data-leakage`, `ml-evaluation-fundamentals`.
- Python/data/backend: `python-for-ai-engineering`, `data-structures-algorithmic-complexity`, `numpy-vectorized-computation`, `pandas-dataset-preparation`, `missing-values-duplicates-outliers`, `python-async-await`, `concurrency-parallelism`, `http-rest-apis-contracts`, `authentication-authorization-tenant-isolation`, `background-jobs-long-running-operations`.

The 26 additional sections are represented as upcoming in `curriculum/manifest.json`. Their presence in the manifest is a coverage commitment, not a claim that their lessons have already been written.

## Assessment alignment from the uploaded syllabus

| Assessment | Required knowledge | Curriculum destination |
|---|---|---|
| Q6: vLLM prefix caching | Prefix matching, token order, KV cache reuse | LLM Serving Infrastructure and vLLM |
| Q7: LLM judge position bias | Pairwise evaluation, answer-order swapping, judge reliability | LLM Evaluation and Quality Engineering |
| Q8: Long-context latency | Prefill/decode, chunked prefill, scheduling | LLM Inference Fundamentals; LLM Serving Infrastructure; Performance and Observability |
| Q9: `wait_for` and executor | Cancellation propagation, blocking thread behavior, executor slot lifecycle | Asynchronous Programming and Concurrency |
| Q10: PostgreSQL connection pool | Little's Law, connection hold time, pool saturation | Performance and Observability; Database Engineering for AI Platforms; Database Engineering track |
| LLMGateway coding challenge | Retry classification, deadlines, fallback, concurrency limits, circuit breakers, failure history | Resilient Backend Systems |
| Agentic Universe role expectations | Durable workflows, data modelling, distributed systems, deployment reliability, scalability | Agentic Systems; Database Engineering for AI Platforms; Distributed Systems; Production Deployment; Systems Design |

## Required depth for every new lesson

Every new lesson must teach:
1. The real production problem and invariant.
2. The mental model and internal mechanics.
3. A worked execution trace with concrete inputs and outputs.
4. A runnable or carefully annotated implementation where appropriate.
5. Quantitative reasoning: latency, throughput, memory, concurrency, GPU capacity or cost where relevant.
6. When to use the technique and when not to use it.
7. What breaks if it is absent or misconfigured.
8. Alternatives and trade-offs.
9. Operational signals and a debugging path.
10. Scenario questions that test transfer to a changed constraint.

A heading or glossary entry does not count as coverage. The lesson must make the learner capable of implementing, debugging, or defending a design choice.
