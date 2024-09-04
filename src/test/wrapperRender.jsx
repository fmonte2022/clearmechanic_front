import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { store } from 'src/redux/store';
import global_es from 'src/translations/es/global.json';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={'es'} messages={global_es}>
        {children}
      </IntlProvider>
    </Provider>
  )
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'

export {customRender as render}