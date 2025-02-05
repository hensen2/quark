import { test as testBase } from 'vitest';
import { startWorker, worker } from './src/mocks/browser.ts';

interface TestContext {
  worker: typeof worker;
}

export const test = testBase.extend<TestContext>({
  worker: [
    async ({}, use) => {
      await startWorker();
      await use(worker);
      worker.stop();
    },
    { auto: true },
  ],
});
