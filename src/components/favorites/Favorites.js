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
          <div>
            <div className='grid grid-cols-12 gap-x-2 items-center py-2 border-b font-medium'>
              <div className='col-span-4'>Name</div>
              <div className='col-span-2 justify-self-end'>Date Created</div>
              <div className='col-span-2 justify-self-end'>Language</div>
              <div className='col-span-2 justify-self-end'>Stars</div>
            </div>
            <ul>
              { favoriteIds.map(favoriteId => <FavoriteRepo key={favoriteId} favoriteId={favoriteId} />) }
            </ul>
          </div>
        )
      }
    }
  }

  return (
    <section className='py-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl'>My Favorite Repositories ({favoriteIds.length})</h2>
        {favoriteIds.length === 10 ? <p className='text-xs font-medium text-orange-600'>*You can only save up to 10 repos!</p> : null}
      </div>
      <div className='py-4'>{renderContent()}</div>
    </section>
  )
}