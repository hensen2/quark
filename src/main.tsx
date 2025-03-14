import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app';
import { AuthProvider } from './context/AuthContext.tsx';

async function enableMocking(): Promise<void> {
  if (import.meta.env.MODE === 'development') {
    const { startWorker } = await import('./test/mocks/browser.ts');
    await startWorker();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
});
