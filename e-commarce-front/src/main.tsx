import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import './index.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import './styles/glopal.css';

import { Provider } from 'react-redux';
import { store, prisestor  } from '@store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from '@routes/AppRouter.tsx';
// import AppRouter from '@routes/AppRouter.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
    <PersistGate loading={null} persistor={prisestor}>
    <AppRouter>
    <App />
    </AppRouter>
    </PersistGate>
    </Provider>
  </StrictMode>,
  
)
