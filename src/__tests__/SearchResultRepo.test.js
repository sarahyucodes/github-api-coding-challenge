import React from 'react'
//
import { render, cleanup, screen } from '../test-utils'
import { SearchResultRepo } from '../components/search/SearchResultRepo'

let store 
let container

beforeEach(() => {
  const { store: rootStore, container: elementContainer } = render(<SearchResultRepo repoId={15452919}/>, {
    preloadedState:{
      search: {
        id: [15452919],
        entities: {
          15452919: {
            id: 15452919,
            full_name: 'ethereum/go-ethereum',
            stargazers_count: 26012,
            language: "Go",
          }
        }
      }
    }
  })
  store = rootStore
  container = elementContainer
})

afterEach(() => cleanup())

describe('<SearchResultRepo />', () => {
  it('should display the name, language, stars, and description of the repo', () => {
    const searchState = store.getState().search
    const preloadedResultId = searchState.id[0]

    const {
      full_name,
      stargazers_count,
      language
    } = searchState.entities[preloadedResultId]

    expect(screen.getByText(full_name)).toBeInTheDocument()
    expect(screen.getByText(`${stargazers_count} Stars`)).toBeInTheDocument()
    expect(screen.getByText(language)).toBeInTheDocument()

  })

  it.todo('should not be able to save a repo if it already exists in favorites')
  it.todo('should not be able to save a repo if there are already 10 saved in favorites')
  it.todo('should be able to save a repo by clicking on the save button')
})