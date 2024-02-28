import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { Profiler } from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';

const root = document.getElementById('root');
if (root === null) {
  throw new Error('Root element not found');
}
const queryClient = new QueryClient();
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Profiler id='app' onRender={(...arg) => console.log(...arg)}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Profiler>
  </React.StrictMode>
);
