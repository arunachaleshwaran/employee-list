import './App.css';
import reactLogo from './assets/react.svg';
import { useState } from 'react';
import viteLogo from '/vite.svg';

function App() {
  const INCREMENT_COUNT = 1,
    INITIAL_COUNT = 0,
    [count, setCount] = useState(INITIAL_COUNT);
  return (
    <>
      <div>
        <a href='https://vitejs.dev' rel='noreferrer' target='_blank'>
          <img alt='Vite logo' className='logo' src={viteLogo} />
        </a>
        <a href='https://react.dev' rel='noreferrer' target='_blank'>
          <img
            alt='React logo'
            className='logo react'
            src={reactLogo}
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button
          type='button'
          onClick={() =>
            setCount(currentCount => currentCount + INCREMENT_COUNT)
          }>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
