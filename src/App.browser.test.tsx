import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import App from './app';

it('displays the App component', async () => {
  render(<App />);

  await expect.element(page.getByText('Vite + React')).toBeVisible();
});
