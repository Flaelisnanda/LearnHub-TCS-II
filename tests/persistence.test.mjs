import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const loadModule = async path => import(`data:text/javascript;base64,${Buffer.from(await readFile(new URL(path, import.meta.url))).toString('base64')}`);
const { createLearningRepository, emptyLearning } = await loadModule('../src/learningRepository.js');
const { courses, plans } = await loadModule('../src/mockData.js');

test('creates, restores, updates and removes learning data across repository restarts', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'learnhub-test-'));
  const filename = join(directory, 'storage.json');
  const adapter = () => ({
    async getItem() {
      try { return await readFile(filename, 'utf8'); }
      catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    },
    async setItem(key, value) { await writeFile(filename, value); },
  });
  const reopen = () => createLearningRepository(adapter(), courses, plans);
  try {
    assert.deepEqual(await reopen().load(), emptyLearning());
    const created = { ...emptyLearning(), enrolled: [1, 2] };
    await reopen().save(created);
    assert.deepEqual(await reopen().load(), created);
    const updated = { ...created, completed: { 1: [0, 1] }, planId: 2 };
    await reopen().save(updated);
    assert.deepEqual(await reopen().load(), updated);
    const removed = { ...updated, enrolled: [2], completed: {} };
    await reopen().save(removed);
    assert.deepEqual(await reopen().load(), removed);
    await reopen().save({ ...removed, enrolled: [2, 1] });
    assert.deepEqual((await reopen().load()).completed, {});
  } finally { await rm(directory, { recursive: true }); }
});

test('corrupt or incompatible data is rejected without overwriting storage', async () => {
  for (const raw of ['{broken', JSON.stringify({ version: 2 }), JSON.stringify({ ...emptyLearning(), completed: { 1: [0] } })]) {
    let writes = 0;
    const repository = createLearningRepository({ getItem: async () => raw, setItem: async () => { writes++; } }, courses, plans);
    await assert.rejects(repository.load());
    assert.equal(writes, 0);
  }
});

test('storage failures propagate and invalid snapshots cannot be written', async () => {
  const repository = createLearningRepository({
    getItem: async () => { throw new Error('read failed'); },
    setItem: async () => { throw new Error('write failed'); },
  }, courses, plans);
  await assert.rejects(repository.load(), /read failed/);
  await assert.rejects(repository.save(emptyLearning()), /write failed/);
  await assert.rejects(repository.save({ ...emptyLearning(), enrolled: [1, 1] }), /Invalid enrollment/);
  await assert.rejects(repository.save({ ...emptyLearning(), enrolled: [1], completed: { 1: [99] } }), /Invalid module/);
});
