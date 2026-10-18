# Database Curriculum Content Audit

Audit date: 2026-10-18

## Summary

The audit reviewed all published database lessons for teaching quality, not just JSON validity. The six-layer interview synthesis is now topic-specific across the 16 original published lessons. Three missing foundational lessons have also been added: SQL Query Fundamentals, Database Transactions and Isolation, and Redis and Caching Architecture. The database curriculum now has 20 sections: 19 published lessons. The remaining priority is production operations, which should be taught explicitly or added as a focused lesson.

## Fixes applied in this branch

- **SQL join multiplication:** Added input tables, the exact join query, all six joined rows, and before/after totals. Explains why the total doubles from ₹600 to ₹1,200, why COUNT(DISTINCT order_id) does not repair an inflated SUM, and why AVG only appears correct in this evenly duplicated example.
- **B-tree traversal:** Replaced a generic query-plan checklist with root → internal page → leaf → optional heap fetch. Clarified fan-out-based height, page visits, cache state, and end-to-end latency.
- **Query-plan analysis:** Fixed escaped newlines in the EXPLAIN output and added a concrete estimate mismatch (900 estimated rows vs 120,000 actual) and a sort spill. Clarifies planner cost units and the risk of raising work_mem without considering concurrency.
- **All 16 original published lessons:** Replaced generic six-layer synthesis introductions and template scale prompts with topic-specific problem statements, explanations, and worked examples. Removed redundant learning objectives that merely announced use of the framework.
- **New SQL fundamentals lesson:** Covers SELECT/WHERE, expressions, CASE, DISTINCT, ORDER BY/LIMIT, NULL basics, logical query order, expected outputs, and deterministic top-N queries.
- **New transactions/isolation lesson:** Covers ACID, atomic inventory updates, check-then-write races, isolation and locks, deadlocks/serialization retries, transaction boundaries, and external side-effect/idempotency pitfalls.
- **Redis/caching lesson:** Added cache-aside, TTL and invalidation, stale data, cache stampedes, hot keys, memory/eviction, persistence, replication lag, and failure handling. Updated the manifest from upcoming to published and retained its prerequisite relationship to index fundamentals.
- **Curriculum ordering:** Added SQL fundamentals first and transactions after relational keys/constraints, then shifted existing section order without changing existing lesson IDs. The manifest now has 20 sections, with 19 published.

## Remaining coverage gaps

These are follow-up priorities rather than claims that every item needs a separate lesson:

1. **Production operations and recovery:** backup/restore drills, point-in-time recovery, RPO/RTO, safe expand-contract migrations, connection-pool sizing, observability, and incident diagnosis.
2. **Index operations:** concurrent index builds, index size and bloat measurement, unused/redundant indexes, and safe index replacement. Existing lessons explain index costs but do not fully teach operational procedures.
3. **Replication and distribution:** deeper failure cases for replica lag, failover, read-after-write guarantees, partitioning versus sharding, hot partitions, and recovery after promotion.
4. **Redis durability choices:** the new lesson covers RDB/AOF and replication at interview level; deeper production configuration and failover runbooks can be a separate operations module if needed.

## Acceptance checklist used

- Plain-language motivation before formal vocabulary.
- A small concrete example that can be traced line by line.
- SQL/code that is runnable or clearly labelled as schematic.
- Expected output and explanation of important rows/values.
- Internal mechanism: what the database does, in order.
- Quantitative scale with units, assumptions, and caveats where relevant.
- Trade-offs and failure modes with a practical decision rule.
- Interview probes with explained answers and edge cases.
- Canonical lesson source and generated dist copy stay in sync.
- Schema validation and publishing tests pass; structural validation is not a substitute for pedagogical review.
