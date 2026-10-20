# Teaching Quality Standard for Interview Prep Lessons

This standard applies to every published lesson in Database Engineering and AI Engineering. Structural validation is necessary but not sufficient.

## The learner outcome

After a lesson, a learner should be able to solve a new scenario and defend a decision. They should not merely recognize a definition.

## Required teaching moves

1. **Start from a concrete problem.** Name the product or engineering situation and the invariant, output, or constraint that matters.
2. **Build the mental model.** Explain what the mechanism does in plain language before introducing terminology.
3. **Walk through an example.** Show the inputs, code/query, execution steps, and expected result. Explain why each important line or step exists.
4. **Make a decision.** State when to use the technique, when not to use it, and what simpler or safer alternative may fit.
5. **Show the counterfactual.** Explain what fails if the technique is omitted or misused, including a timeline, wrong output, operational symptom, or measurable cost where useful.
6. **Explain trade-offs.** Cover relevant latency, throughput, memory/storage, cost, correctness, reliability, complexity, and maintenance consequences.
7. **Teach diagnosis.** Connect symptoms to likely causes and show what to inspect next rather than giving a list of terms.
8. **Test transfer.** Ask scenario questions that change one important constraint so the learner must reason rather than repeat the example.

## Database Engineering emphasis

- State the business invariant before choosing SQL, a constraint, lock, isolation level, index, cache, or scaling strategy.
- Show result grain and expected row counts for SQL; show realistic plan evidence for performance work.
- Explain concurrency interleavings, database-engine-specific behavior, transaction failure/retry behavior, and the cost of stronger coordination.
- Treat migrations, backups, failover, vacuum, and index operations as production changes with risk, verification, and rollback plans.

## AI Engineering emphasis

- Connect each ML or AI concept to a product decision, baseline, data requirement, failure mode, and evaluation method.
- Separate model behavior from deterministic application logic, authorization, validation, and other exact business rules.
- Make dataset splits, leakage, thresholds, false positives/negatives, workload capacity, latency, cost, and production monitoring concrete.
- Explain Python/data/backend choices through execution traces, complexity, bounded resources, failure handling, and maintainability.

## Acceptance check

A lesson is not complete merely because it passes JSON schema validation, has a revision sheet, or contains code. Reviewers should ask:

- Can the learner predict what happens if the technique is absent or incorrect?
- Can the learner choose among plausible alternatives and explain the trade-off?
- Can the learner identify the first useful diagnostic when the system behaves unexpectedly?
- Can the learner apply the idea to a different scenario?

The curriculum validation suite enforces the presence of a concrete decision lab in every published Database Engineering and AI Engineering lesson. Human review must still verify correctness, clarity, and depth.
