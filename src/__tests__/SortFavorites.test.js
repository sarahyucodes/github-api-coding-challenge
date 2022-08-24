import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
//
import { SortFavorites } from '../components/favorites/SortFavorites'

const sortOptions = ['Date Created', 'Stars']
const mockHandleClickSort = jest.fn(sortOption => sortOption)

describe('<SortFavorite />', () => {
  it('show buttons for each sort option', () => {
    render(<SortFavorites sortOptions={sortOptions} />)
    
    expect(screen.getAllByRole('button').length).toBe(sortOptions.length)
  })

  it('should fire the click handler function when a sort option is clicked', () => {
    render(<SortFavorites sortOptions={sortOptions} setSortBy={mockHandleClickSort} />)
    userEvent.click(screen.getAllByRole('button')[0])

    expect(mockHandleClickSort).toHaveBeenCalled()
  })

  it('should disable the sort option that is currently selected', async () => {
    render(<SortFavorites sortOptions={sortOptions} sortBy={sortOptions[1]} />)
    const unselectedSortOption = screen.getAllByRole('button')[1]

    expect(unselectedSortOption).toHaveAttribute('disabled')
  })
})