import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { fetchFavorites, selectIds } from '../../slices/favorites'

import { FavoriteRepo } from './FavoriteRepo'

export const Favorites = () => {
  const dispatch = useDispatch()

  const fetchStatus = useSelector(state => state.favorites.fetchStatus)
  const fetchError = useSelector(state => state.favorites.fetchError)
  const favoriteIds = useSelector(selectIds)

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
        return (
          <ul>
            { favoriteIds.map(favoriteId => <FavoriteRepo key={favoriteId} favoriteId={favoriteId} />) }
          </ul>
        )
      }
    }
  }

  return (
    <section className='Favorites py-10'>
      <h2 className='text-xl'>My Favorite Repositories</h2>
      <div className='py-2'>{renderContent()}</div>
    </section>
  )
}