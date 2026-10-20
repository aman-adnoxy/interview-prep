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

test('all published database lessons keep a consistent assessment contract', () => {
  const curriculum = JSON.parse(fs.readFileSync(path.join(root, 'curriculum/manifest.json'), 'utf8'));
  const databaseModule = curriculum.modules.find(module => module.id === 'databases');
  assert.ok(databaseModule, 'database module must exist');
  const directory = path.join(root, 'lessons/databases');
  const byId = new Map();
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.json'))) {
    const item = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
    byId.set(item.id, { item, filename });
  }
  const published = databaseModule.sections.filter(section => section.status === 'published');
  assert.equal(published.length, 20, 'the published database curriculum should retain its 20 sections');
  for (const section of published) {
    const entry = byId.get(section.lessonId);
    assert.ok(entry, 'missing source for section ' + section.id);
    const { item, filename } = entry;
    assert.equal(validateLesson(item, filename), true);
    assert.equal(item.questions.length, 12, section.id + ' should have 12 assessment questions');
    assert.equal(new Set(item.questions.map(question => question.id)).size, 12, section.id + ' should have unique question IDs');
    assert.equal(item.interviewScenarios.length, 2, section.id + ' should have two interview scenarios');
    assert.equal(new Set(item.interviewScenarios.map(scenario => scenario.id)).size, 2, section.id + ' should have unique scenario IDs');
    for (const concept of item.concepts) {
      for (const block of concept.blocks) {
        if (block.type === 'code' && typeof block.source === 'string') {
          assert.ok(!block.source.includes('\\n'), section.id + '/' + concept.id + ' contains a literal escaped newline in a code sample');
        }
      }
    }
  }
});

test('Database and AI Engineering are single tracks with valid stage membership', () => {
  const curriculum = JSON.parse(fs.readFileSync(path.join(root, 'curriculum/manifest.json'), 'utf8'));
  const db = curriculum.modules.find(module => module.id === 'databases');
  const ai = curriculum.modules.find(module => module.id === 'ai-engineering');
  assert.ok(db && ai);
  assert.equal(db.sections.length, 20);
  assert.equal(db.stages.length, 7);
  assert.equal(ai.sections.length, 20);
  assert.equal(ai.stages.length, 2);
  assert.equal(curriculum.modules.some(module => module.id === 'ai-engineering-python-data-backend'), false);
  for (const module of [db, ai]) {
    const stageIds = new Set(module.stages.map(stage => stage.id));
    assert.equal(stageIds.size, module.stages.length);
    for (const section of module.sections) assert.ok(stageIds.has(section.stageId), section.id + ' must reference a stage');
  }
});

test('every published Database and AI Engineering lesson contains a worked decision lab', () => {
  const curriculum = JSON.parse(fs.readFileSync(path.join(root, 'curriculum/manifest.json'), 'utf8'));
  const sourceFiles = [
    ...fs.readdirSync(path.join(root, 'lessons/databases')).filter(name => name.endsWith('.json')).map(name => path.join(root, 'lessons/databases', name)),
    ...fs.readdirSync(path.join(root, 'lessons/ai-engineering')).filter(name => name.endsWith('.json')).map(name => path.join(root, 'lessons/ai-engineering', name)),
    ...fs.readdirSync(path.join(root, 'lessons/ai-engineering-python-data-backend')).filter(name => name.endsWith('.json')).map(name => path.join(root, 'lessons/ai-engineering-python-data-backend', name))
  ];
  const byId = new Map(sourceFiles.map(file => {
    const item = JSON.parse(fs.readFileSync(file, 'utf8'));
    return [item.id, item];
  }));
  for (const module of curriculum.modules.filter(item => ['databases', 'ai-engineering'].includes(item.id))) {
    for (const section of module.sections.filter(item => item.status === 'published')) {
      const item = byId.get(section.lessonId);
      assert.ok(item, 'missing lesson source for ' + section.lessonId);
      const labs = item.concepts.filter(concept => concept.title.startsWith('Decision lab:'));
      assert.ok(labs.length > 0, section.lessonId + ' must teach a concrete decision, not only define terms');
      assert.ok(labs.some(concept => concept.blocks.some(block => block.type === 'worked_example' || block.type === 'table')),
        section.lessonId + ' decision lab must include a worked example or decision table');
    }
  }
});
