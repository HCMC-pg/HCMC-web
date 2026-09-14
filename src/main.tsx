import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initCustomAssetStore } from './utils/customAssetStore';

// Load stored custom assets from IndexedDB into memory
initCustomAssetStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
