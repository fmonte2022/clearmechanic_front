import React from 'react';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';


import './index.css';
import { store } from 'src/redux/store';
import global_es from 'src/translations/es/global.json';
import App from 'src/App';
import LocalStorageUtility from 'src/utilities/LocalStorageUtility';

const container = document.getElementById('root');
const root = createRoot(container!);

const messages = {
  'es': global_es,
};

const loginLocation =  LocalStorageUtility.loadState();
const lang = loginLocation?.appState?.lang;
const localeKey = lang as keyof typeof messages;

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <IntlProvider locale={localeKey} messages={messages[localeKey]}>
          <CssBaseline />
          <App />  
        </IntlProvider>
      </Provider>
  </React.StrictMode>
);

