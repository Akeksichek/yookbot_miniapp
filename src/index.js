import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SDKProvider } from '@tma.js/sdk-react';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SDKProvider>
      <App />
    </SDKProvider>
  </StrictMode>
);