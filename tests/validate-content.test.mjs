import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateLesson, semanticLessonErrors, validateCurriculum } from '../scripts/validate-content.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const lesson=JSON.parse(fs.readFileSync(path.join(root,'lessons/databases/index-fundamentals.json'),'utf8'));
test('B-tree pilot validates',()=>assert.equal(validateLesson(lesson),true));
test('all question variants are represented',()=>assert.deepEqual(new Set(lesson.questions.map(q=>q.type)),new Set(['single_select','multi_select','true_false'])));
test('missing answer references are rejected',()=>{const c=structuredClone(lesson);c.questions[0].correctOptionId='missing-option';assert.ok(semanticLessonErrors(c).some(e=>e.includes('references missing option id')));});
test('duplicate question IDs are rejected',()=>{const c=structuredClone(lesson);c.questions[1].id=c.questions[0].id;assert.ok(semanticLessonErrors(c).some(e=>e.includes('duplicate question id')));});
test('table rows must match columns',()=>{const c=structuredClone(lesson);c.concepts.flatMap(x=>x.blocks).find(x=>x.type==='table').rows[0].pop();assert.ok(semanticLessonErrors(c).some(e=>e.includes('table row width')));});
test('diagram edges must reference existing nodes',()=>{const c=structuredClone(lesson);c.concepts.flatMap(x=>x.blocks).find(x=>x.type==='diagram').edges[0].to='missing-node';assert.ok(semanticLessonErrors(c).some(e=>e.includes('diagram edge references missing node')));});

test('published curriculum sections must resolve to an existing lesson', () => {
  const curriculum = JSON.parse(fs.readFileSync(path.join(root, 'curriculum/manifest.json'), 'utf8'));
  assert.throws(() => validateCurriculum(curriculum, new Map()), /published lesson missing/);
});

test('Module 1 SQL lessons validate against the canonical lesson schema', () => {
  const files = ['relational-databases-keys-constraints.json','sql-joins.json','sql-aggregation-group-by-having-ctes.json','sql-null-semantics.json','schema-design-normalization.json','advanced-sql-window-functions-set-operations.json'];
  const loaded = files.map(file => JSON.parse(fs.readFileSync(path.join(root, 'lessons/databases', file), 'utf8')));
  for (const item of loaded) {
    assert.equal(validateLesson(item, item.id), true);
    assert.equal(item.questions.length, 12);
    assert.equal(item.interviewScenarios.length, 2);
  }
  assert.ok(loaded.find(item => item.sectionId === 'advanced-sql-window-functions-set-operations').concepts.some(concept => concept.id === 'module-cumulative-challenge'));
});
