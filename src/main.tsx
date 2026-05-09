import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('BloomFilter error')) return;
  originalConsoleWarn(...args);
};

console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('BloomFilter error')) return;
  originalConsoleError(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
