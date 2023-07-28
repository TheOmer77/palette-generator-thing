import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import GlobalStateProvider from 'components/providers/GlobalStateProvider';
import App from './App';

import '@fontsource-variable/figtree';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </StrictMode>
);
