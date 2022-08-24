import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { fetchFavorites, selectIds } from '../../slices/favorites'

import { FavoritesList } from './FavoritesList'
import { SortFavorites } from './SortFavorites'
import { Error } from '../error/Error'

export const Favorites = () => {
  const dispatch = useDispatch()
  
  const sortOptions = ['Date Created', 'Stars']

  const [sortBy, setSortBy] = useState(sortOptions[1]) // default sort by stars

  const fetchStatus = useSelector(state => state.favorites.fetchStatus)
  const fetchError = useSelector(state => state.favorites.fetchError)
  const favoriteIds = useSelector(selectIds)

  const removeError = useSelector(state => state.favorites.removeError)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  const renderContent = () => {
    if (fetchStatus === 'loading') {
      return <p>Loading...</p>
    } else if (fetchStatus === 'failed') {
      return <p>{fetchError}</p>
    } else if (fetchStatus ==='success') {
      if (favoriteIds.length === 0) {
        return <p>You don't have any favorites saved!</p>
      } else {
        return <FavoritesList sortBy={sortBy} sortOptions={sortOptions} />
      }
    }
  }

  return (
    <section className='py-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl'>My Favorite Repositories ({ favoriteIds.length })</h2>
        <Error error={removeError} />
      </div>
      {favoriteIds.length > 0 ? <SortFavorites sortOptions={sortOptions} sortBy={sortBy} setSortBy={setSortBy} /> : null}
      <div className='py-4'>
        {renderContent()}
      </div>
    </section>
  )
}