import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './sass/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faUsers,
  faMagnifyingGlass,
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBell, faUsers, faMagnifyingGlass, faArrowLeft, faEye, faEyeSlash);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
