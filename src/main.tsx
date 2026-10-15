import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/responsive.css';
import './styles/motion.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
