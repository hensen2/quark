import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.ts';

export const worker = setupWorker(...handlers);

export async function startWorker(): Promise<void> {
  await worker.start({
    quiet: false,
    onUnhandledRequest(request, print) {
      if (/(\.(css|tsx?|woff2?))/.test(request.url)) {
        return;
      }

      print.error();
    },
  });
}
