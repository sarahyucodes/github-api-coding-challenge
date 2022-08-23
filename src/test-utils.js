import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
//
import { rootReducer } from './slices/index'

export const render = (
  component,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>
      {children}
    </Provider>
  }

  return { store, ...rtlRender(component, {
    wrapper: Wrapper,
    ...renderOptions
  })}
}

export * from '@testing-library/react'