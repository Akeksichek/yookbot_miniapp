import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initMiniApp, initThemeParams, initViewport } from '@tma.js/sdk';

Promise.all([
  initMiniApp(),
  initThemeParams(),
  initViewport(),
]).then(() => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});