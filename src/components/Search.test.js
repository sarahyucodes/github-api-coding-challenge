import React from 'react'
import userEvent from '@testing-library/user-event'
//
import { render, cleanup, screen, waitFor } from '../test-utils'
import { Search } from '../components/search/Search'
import { fetchResults, setSearchStatusFailed } from '../slices/search'
import { act } from 'react-dom/test-utils'
import { wait } from '@testing-library/user-event/dist/utils'

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

    // act(() => {
    //   store.dispatch(fetchResults(query))
    // })

    // const searchResults = store.getState()
    // console.log(searchResults)
    
    // // await waitFor(() => expect(searchResults.length).toBeGreaterThan(0))
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

  it('should display 5 results for the search term', async () => {
    const query = 'tetris'

    act(() => {
      store.dispatch(fetchResults(query))
    })

    const searchResults = await store.getState().search
    console.log(searchResults)
  })
})
