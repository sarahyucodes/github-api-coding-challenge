import React from 'react'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'

import App from './App'
import store from './slices/index'

export const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}