import './index.scss';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const root = document.getElementById('root');
if (root === null) {
  throw new Error('Root element not found');
}
const queryClient = new QueryClient();
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {SHOW_REACT_QUERY_DEVTOOLS ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  </React.StrictMode>
);
