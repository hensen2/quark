import { test as testBase } from 'vitest';
import { startWorker, worker } from './src/test/mocks/browser.ts';

type TestContext = {
  worker: typeof worker;
};

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
