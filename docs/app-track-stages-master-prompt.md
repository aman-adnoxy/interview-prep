# Master Prompt: Implement Unified Tracks and Colored Stages in interview-prep-app

You are implementing the app-side presentation for curriculum metadata from `aman-adnoxy/interview-prep`. Read the current app code before editing. The content repository is the source of truth for track titles, stages, stage order, lesson order, and section-to-stage membership.

## Goal

Show exactly one Database Engineering track and exactly one AI Engineering track. Within each track's learning-path screen, visually group lessons into stage sections with distinct, accessible background colors. Do not turn stages into separate tracks/cards in the main Curriculum, Home, or Progress surfaces.

## Canonical content metadata

The built curriculum manifest exposes:
- `topic.id`, `topic.title`, `topic.description`, `topic.order`
- `topic.stages[]`: `id`, `title`, `description`, `order`
- `topic.sections[]`: existing `id`, `title`, `lessonId`, `difficulty`, `order`, `status`, `questionCount`, plus `stageId`

Database Engineering uses track id `databases` and seven stages:
1. SQL and Relational Foundations
2. Transactions and Concurrency
3. Indexes and Query Performance
4. Database Internals
5. Redis and Caching
6. Database Choice, Scaling and Reliability
7. Production Operations

AI Engineering uses track id `ai-engineering` and two stages:
1. AI and ML Foundations
2. Python, Data and Backend Foundations

Never hardcode lesson lists or stage membership in the app. Read the manifest. Stage colors may be mapped from stable stage IDs in the app's theme layer, but membership, title, order, and description must come from content metadata.

## Existing app files to inspect first

- `src/components/TopicLearningPath.jsx`: learning-path screen
- `src/components/TracksOverview.jsx`: Curriculum list and inline track expansion
- `src/components/HomeScreen.jsx` and `src/components/ProgressScreen.jsx`: any duplicated track/module assumptions
- `src/topicThemes.js`: track-level theme mapping
- `src/services/api.js`, `src/services/contentValidation.js`, `src/services/storage.js`: manifest loading, validation, and persisted progress
- `public/manifest.json`, `public/content-index.json`, and `public/lessons/**`: generated/synced content; do not manually hardcode a second curriculum source.

## Implementation requirements

1. Keep one card per track in Curriculum. AI Engineering must appear once, with all 20 lessons. Database Engineering must appear once, with its 20 published lessons.
2. In `TopicLearningPath.jsx`, group sections by `stageId` using `topic.stages` order. Render a stage header/card with title, description, stage lesson count, and completion count. Render its lesson nodes inside that stage group, preserving current lesson selection behavior.
3. Use different stage background colors, preferably subtle tints with readable contrast. Keep a consistent color system across tracks, and do not use color as the only signal. Stage title and order must remain visible.
4. For sections without `stageId` or topics without `stages`, gracefully fall back to the current flat section list. Do not crash on older cached manifests.
5. Preserve the existing section and lesson IDs. Do not rename IndexedDB keys, reset localStorage, clear progress, or migrate progress by title. Progress continues to be keyed by the unchanged `section.id`.
6. Ensure progress calculations count each published section exactly once at track level and at its stage level. Do not double-count sections or include upcoming/unpublished sections in completion percentages.
7. Preserve lesson click navigation, question counts, completion indicators, current/locked states, mobile responsiveness, and keyboard accessibility. Avoid nested interactive elements.
8. Update content validation only as needed to accept `stages` and `stageId`; do not weaken existing validation.
9. Ensure the main Curriculum view still displays only one AI Engineering card and one Database Engineering card. Avoid exposing implementation-only stage IDs to users.
10. Do not alter lesson teaching content or assessment content as part of this UI task.

## Required tests and verification

- Run the existing test suite and production build.
- Verify one AI Engineering track contains all 20 AI lessons, ordered Foundations first and Python/Data/Backend second.
- Verify Database Engineering contains 20 published lessons grouped into seven stages.
- Verify every section with a stageId resolves to a stage in that topic.
- Verify completed counts at track and stage levels match the existing IndexedDB progress data without resetting it.
- Verify a legacy manifest without stage metadata still renders.
- Verify a user can open any lesson from Curriculum and from the learning path.
- Inspect mobile and desktop layouts, text contrast, and keyboard interaction.
- Confirm no lesson IDs, section IDs, quiz attempt keys, or progress keys changed.

## Scope discipline

Implement the smallest complete UI change. Do not redesign unrelated screens, alter curriculum order outside the manifest, merge lessons, rewrite content, add sample data, or fabricate progress. Report changed files, tests run, and any remaining limitations.
