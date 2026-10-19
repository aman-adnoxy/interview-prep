# Database Curriculum Content Audit

Audit date: 2026-10-19

## Summary

The database curriculum retains 20 published lessons across the existing modules. This pass implements the identified teaching and compatibility fixes in the canonical lesson sources. Existing strong material—such as join multiplication, foreign-key delete behavior, `DISTINCT` semantics, cache-aside, retry storms, backup-versus-replica differences, and the six-layer interview framework—was preserved rather than rewritten redundantly.

## Fixes applied in this pass

- **PostgreSQL version compatibility:** Checkpoint monitoring now uses `pg_stat_checkpointer` and its PostgreSQL 17+ column names. Foreground relation-write inspection is a separate `pg_stat_io` query. The lesson warns that checkpoint counters are cumulative and version-dependent.
- **Transaction-ID wraparound:** Added database/table XID-age diagnostic queries, guidance for comparing values with live freeze settings, and a clear distinction between ordinary dead-tuple bloat and anti-wraparound risk.
- **Concurrency correctness:** Added row-by-row lost-update and write-skew timelines, explained why PostgreSQL REPEATABLE READ does not protect every cross-row invariant, and compared READ COMMITTED, REPEATABLE READ, and SERIALIZABLE. Added an atomic increment example.
- **Safe retries and idempotency:** Added a worked PostgreSQL upsert and a bounded `psycopg` transaction retry example with a stable request ID, stored outcome, conditional stock update, full-transaction retries, exponential backoff, jitter, and the limitation that a database transaction cannot make an external side effect atomic.
- **Production index operations:** Added index size/usage/validity inventory, optional `pgstattuple`/B-tree inspection, concurrent build progress, validity checks, and a staged replacement/removal runbook. The lesson explains that index size alone does not prove bloat, zero `idx_scan` alone does not prove an index is unused, and a failed concurrent unique build can still enforce uniqueness in some failure states.
- **Live constraint rollout:** Added a duplicate precheck and a staged `CREATE UNIQUE INDEX CONCURRENTLY` → verify → attach-constraint walkthrough, including the transaction-block restriction and invalid-index failure handling.
- **SQL fundamentals:** Added `IN`, `BETWEEN`, PostgreSQL `ILIKE`, pattern-matching trade-offs, plus offset versus keyset pagination with a distinct sample input and matching expected IDs. Existing teaching that `DISTINCT` applies to the complete selected tuple was retained.
- **Aggregation and normalization:** The CTE example now shows its exact expected result. The normalization lesson adds before/after sample rows and states the business-rule assumption behind the decomposition.
- **NULL and window-function edge cases:** Added `NOT UNKNOWN`, a fully calculated NULL-safe join showing 2 × 2 = 4 matches, and a running-total example showing how tied sort keys behave with the default window frame versus an explicit `ROWS` frame and deterministic tie-breaker.
- **Index-family fit:** Added a JSONB operator-class comparison showing that `jsonb_path_ops` does not support key-existence operators such as `?`, plus an SP-GiST point-in-box example. The lesson cautions that operator class and query operator must match.
- **Query-plan interpretation:** Added an `actual rows` plus `loops` explanation, distinguishes millisecond execution time from arbitrary planner cost units, and describes what buffer hits/reads can and cannot establish about physical I/O.
- **Composite indexes:** Added a second query shape contrasting a tenant-scoped feed with a global newest-first feed, including when a second index may be worth its write and storage cost.
- **B-tree mechanism and scale:** Removed a duplicate learning objective and added an illustrative warm/cold page-access comparison, while clarifying that B-tree height is not a fixed end-to-end latency guarantee.
- **Failover and distribution:** Added an asynchronous-replica promotion timeline, fencing/split-brain implications, request reconciliation, and a concrete hot-tenant example distinguishing partitioning on one server from distributing writes across shards.
- **Repetition and assessment consistency:** Merged repeated introductory definitions in Index Fundamentals. Published database lessons are standardized at 12 questions and two interview scenarios, with a repository test to prevent accidental drift.

## Deliberately not duplicated

- The relational constraints lesson already teaches `ON DELETE RESTRICT`, `CASCADE`, `SET NULL`, and `SET DEFAULT` with consequences.
- SQL fundamentals already explains that `DISTINCT` compares complete selected output rows.
- Scaling/reliability already covers read-after-write routing, replica lag, bounded retries/backoff, retry amplification, failover basics, and why a replica is not a backup. This pass adds deeper timelines and hotspot failures rather than repeating those definitions.
- Transaction and operations material on retries, external side effects, backup/PITR, and rolling migrations has been extended where a worked example was missing instead of replaced wholesale.

## Remaining specialist depth

These topics can be extended later if the target roles need a dedicated deep dive; they are not blockers for the fixes in this pass:

1. Full Redis/replication operational runbooks for deployment-specific durability, failover, and recovery settings.
2. The follow-up adds optimistic version checks and deferred-constraint examples. Deeper transaction labs can still explore application-specific multi-row invariants and provider-specific retry behavior.
3. The follow-up adds general PostgreSQL index size/usage inspection, optional B-tree diagnostics, and a safe replacement/removal workflow. Provider-specific maintenance and recovery drills remain a useful specialization.


## Additional production and concurrency depth (PR #18 follow-up)

- **Optimistic concurrency:** Added a version-column compare-and-swap example, explained zero-row updates as conflict signals, and separated row-version checks from multi-row invariant protection.
- **Deferred constraints:** Added a worked example where a foreign key is checked at commit, clarifying that the rule is delayed—not disabled.
- **Index lifecycle:** Added index-size and observed-usage inspection, the distinction between size and bloat, optional `pgstattuple` B-tree diagnostics, checks for redundant definitions and constraint dependencies, and a staged replacement/removal checklist.
- Existing PostgreSQL 17 checkpoint views, write-skew/idempotency examples, concurrent unique-index rollout, and replica-failover timeline on current `main` were retained. This follow-up should not replace those newer, more complete versions with the older copies from stale branches.

## Teaching and publishing acceptance checklist

- Plain-language motivation before formal vocabulary.
- SQL/code that is runnable or clearly labelled as schematic, with required tables/assumptions stated.
- Expected output and explanation of important rows or values.
- Internal mechanism traced in order, including what the database does.
- Quantitative scale with units, assumptions, and caveats where relevant.
- Trade-offs, failure modes, and an actionable decision rule.
- Interview probes with explained answers and edge cases.
- Canonical source and generated `dist/` copies match byte-for-byte.
- Schema validation, semantic checks, test suite, build, and generated-output freshness check pass in CI.
