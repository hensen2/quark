import { page } from '@vitest/browser/context';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';

it('displays the App component', async () => {
  render(<App />);

  await expect.element(page.getByText('Vite + React')).toBeVisible();
});
