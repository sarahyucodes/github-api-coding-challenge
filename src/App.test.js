import { screen } from '@testing-library/react'
//
import { renderApp } from './test-utils'

describe('<App />', () => {
  renderApp()

  it('renders the header', () => {
    const headerElement = screen.getByRole('heading', { level: 1})
    expect(headerElement).toHaveTextContent(/GitHub Repositories/i)
  })
})
