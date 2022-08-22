import { screen } from '@testing-library/react'
import { search } from '../api/search'
//
import { renderApp } from '../test-utils'

describe('<Search />', () => {
  renderApp()

  it('renders the search input field', () => {
    const searchElement = screen.getByRole('searchbox')
    expect(searchElement).toBeInTheDocument()
  })

  test.todo('searches for the what the user types')
})
