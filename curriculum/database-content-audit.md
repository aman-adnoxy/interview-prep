# Database Curriculum Content Audit

Audit date: 2026-10-18

## Summary

The published database lessons contain useful interview material, but framework compliance must not be confused with teaching quality. The six-layer interview synthesis was added to lessons, yet several layers still contain generic prompts rather than a worked topic-specific case. The lessons should be reviewed for learner understanding, not just schema validity.

## Findings from the lesson review

### Fixed in this branch

- **SQL join multiplication:** Added small orders and addresses tables, the six rows produced by the join, and a before/after result table showing why the order total doubles from ₹600 to ₹1,200. Clarifies why COUNT(DISTINCT ...) does not repair an inflated SUM.
- **B-tree lookup:** Replaced a generic query-plan checklist inside the lookup lesson with actual root → internal page → leaf steps. Clarified that tree height is roughly O(log_f N), where f is fan-out, rather than treating log₂(N) as the number of page visits.
- **Query-plan output:** Converted escaped newline sequences in the worked EXPLAIN output into real line breaks. Replaced the generic scale prompt with a concrete estimated-vs-actual row-count and sort-spill investigation.
- **Interview objectives:** Removed the redundant learning objective that merely said the lesson uses the six-layer framework in the lessons above.

### Patterns that need continued attention

- The scale layer in several lessons still reads like a prompt to the learner ("apply this topic to a realistic workload") rather than a worked case with numbers, an assumption, a result, and a trade-off.
- Some synthesis openings repeat earlier prose or contain template language. This adds length without reliably improving understanding.
- Generic checklists such as "identify query shape / predict mechanism / validate plan" should only be reused when they actually describe the topic being taught.
- Examples should show the input rows, exact SQL, actual output, and a short explanation of why that output follows. If the output is too large, show a representative subset and state the rule.
- Performance numbers must be orders of magnitude with units, assumptions, and caveats—not promises. Distinguish algorithmic complexity, index-page work, heap-page reads, cache hits, disk I/O, and end-to-end latency.
- Practice questions need to test understanding and predict outputs, not merely repeat a definition. Answers should explain the reasoning and common wrong answer where useful.

## Curriculum coverage gaps to plan

The current manifest has 17 database sections: 16 published and Redis/caching marked upcoming. The current published set covers relational keys/constraints, joins, aggregation, NULL semantics, schema design, advanced SQL, indexes and query plans, internals, PostgreSQL-vs-MongoDB, and scaling/reliability. It is not yet a complete backend database interview curriculum.

Prioritize explicit lessons or clear coverage for:

1. **SQL fundamentals:** SELECT/WHERE, ORDER BY/LIMIT, DISTINCT, expressions, CASE, type casting, and query evaluation order.
2. **Transactions:** ACID, BEGIN/COMMIT/ROLLBACK, autocommit, isolation anomalies, row locks, optimistic concurrency, and retry behavior.
3. **Constraints and concurrency:** race conditions, unique constraints, upserts, idempotency, deadlock handling, and safe transaction boundaries.
4. **Index operations:** index creation and maintenance, concurrent index builds, unused/redundant indexes, and measuring index size/write overhead.
5. **Production operations:** backups and restore drills, point-in-time recovery, connection-pool sizing, migrations/expand-contract, monitoring, and incident diagnosis.
6. **Caching:** cache-aside/write-through/write-behind, TTL and invalidation, stampedes, stale data, and consistency trade-offs. It is currently marked upcoming even though scaling-and-reliability lists it as a prerequisite.
7. **Redis and distributed data:** Redis data structures and memory behavior, replication/failover, persistence modes, and when a cache is or is not the source of truth.
8. **Partitioning, sharding, and replication:** clearly distinguish partitioning within a database, sharding across database nodes, replica lag, failover, and consistency guarantees.

These are coverage recommendations, not a claim that every subtopic must be a separate lesson. Some can be taught within existing lessons if the concept is explicit, demonstrated, and tested.

## Acceptance checklist for each lesson

- Plain-language motivation before formal vocabulary.
- A small concrete example that can be traced line by line.
- SQL/code that is runnable or clearly labelled as schematic.
- Expected output and explanation of each important row/value.
- Internal mechanism: what the database does, in order.
- Quantitative scale with units, assumptions, and caveats where relevant.
- Trade-offs and failure modes with a practical decision rule.
- Interview probes with explained answers and edge cases.
- Source lesson and generated dist copy stay in sync.
- Schema validation and tests pass; this checks structure, not teaching quality.
