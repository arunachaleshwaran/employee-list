import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { Profiler } from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const root = document.getElementById('root');
if (root === null) {
  throw new Error('Root element not found');
}
const queryClient = new QueryClient();
if (import.meta.env.MODE === 'development')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Profiler
        id='app'
        onRender={(...arg) => console.log('profiler', ...arg)}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Profiler>
    </React.StrictMode>
  );
else
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
