import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.ts';

export const worker = setupWorker(...handlers);

export const startWorker = async (): Promise<void> => {
  await worker.start({
    quiet: true,
    onUnhandledRequest(request, print): void {
      if (/(\.(css|tsx?|woff2?|vite))/.test(request.url)) {
        return;
      }

      print.error();
    },
  });
};
