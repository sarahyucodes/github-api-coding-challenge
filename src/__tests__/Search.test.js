import React from 'react'
import userEvent from '@testing-library/user-event'
//
import { render, cleanup, screen, act } from '../test-utils'
import { Search } from '../components/search/Search'
import { fetchResults, setSearchStatusFailed } from '../slices/search'

let store 
let container

beforeEach(() => {
  const { store: rootStore, container: elementContainer } = render(<Search />)
  store = rootStore
  container = elementContainer
})

afterEach(() => cleanup())

describe('<Search />', () => {  

  it('should render the search input field', () => {
    const searchElement = screen.getByRole('searchbox')
    expect(searchElement).toBeInTheDocument()
  })

  it('should initially show 0 search results', () => {
    const initialResults = store.getState().search.ids

    expect(initialResults).toHaveLength(0)
  })

  it('should search for the what the user types', async () => {
    const query = 'tetris'

    const searchElement = screen.getByRole('searchbox')
    await userEvent.type(searchElement, query)
    expect(searchElement).toHaveValue(query)
  })

  it('should display a loading message while search request is pending', async () => {
    const query = 'tetris'
    const expectedStatus = 'loading'

    act(() => {
      store.dispatch(fetchResults(query))
    })

    const searchStatus = await store.getState().search.status
    const loadingMessage = screen.getByText(/Loading.../i)

    expect(searchStatus).toBe(expectedStatus)
    expect(loadingMessage).toBeInTheDocument()
   
  });

  it('should display an error message if get result failed', async () => {
    const expectedStatus = 'failed'

    act(() => {
      store.dispatch(setSearchStatusFailed())
    })

    const searchStatus = await store.getState().search.status
    const errorMessage = container.querySelector('.error-message')

    expect(searchStatus).toBe(expectedStatus)
    expect(errorMessage).toBeInTheDocument()
  })

  it.todo('should clear results and reset search status if search term is empty')
  it.todo('should fetch results for the search term')
  it.todo('should render list of search results')
})
