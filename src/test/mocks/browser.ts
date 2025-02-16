import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.ts';

export const worker = setupWorker(...handlers);

export const startWorker = async (): Promise<void> => {
  await worker.start({
    quiet: true,
    onUnhandledRequest(request, print): void {
      if (/(\.(css|[jt]sx?|woff2?))/.test(request.url)) {
        return;
      }

      print.error();
    },
  });
};
