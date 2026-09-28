import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/index.css';
import './styles/loader.css';
import './styles/main.css';

// Returning to a scroll-pinned page mid-document leaves ScrollTrigger and the
// 3D choreography out of sync — always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
