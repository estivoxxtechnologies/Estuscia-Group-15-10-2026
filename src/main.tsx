import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './utils/analytics';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/sectors.css';
import './styles/responsive.css';
import './styles/motion.css';

initAnalytics();
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
