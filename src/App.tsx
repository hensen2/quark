import { Button } from '@/components/ui/button';
import { type JSX, useState } from 'react';
import DemoPage from './app/page';

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <h1>Vite + React</h1>
        <div>
          <Button onClick={(): void => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </div>
        <DemoPage />
      </div>
    </>
  );
}

export default App;
