import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { fetchFavorites, selectIds, selectAll } from '../../slices/favorites'

import { FavoriteRepo } from './FavoriteRepo'
import { SortFavorites } from './SortFavorites'


export const Favorites = () => {
  const dispatch = useDispatch()
  
  const sortOptions = ['Date Created', 'Stars']

  const [sortBy, setSortBy] = useState(sortOptions[1]) // default sort by stars

  const fetchStatus = useSelector(state => state.favorites.fetchStatus)
  const fetchError = useSelector(state => state.favorites.fetchError)

  const allFavorites = useSelector(selectAll)
  const sortedByStars = useSelector(selectIds)
  const sortedByDate = allFavorites.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(item => item.id)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  const renderContent = () => {
    if (fetchStatus === 'loading') {
      return <p>Loading...</p>
    } else if (fetchStatus === 'failed') {
      return <p>{fetchError}</p>
    } else if (fetchStatus ==='success') {
      let favoriteIds

      if (sortBy === sortOptions[0]) {
        favoriteIds = sortedByDate
      } else if (sortBy === sortOptions[1]) {
        favoriteIds = sortedByStars
      }

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
        <h2 className='text-xl'>My Favorite Repositories ({ allFavorites.length })</h2>
        {allFavorites.length === 10 ? <p className='text-xs font-medium text-orange-600'>*You can only save up to 10 repos!</p> : null}
      </div>
      <SortFavorites sortOptions={sortOptions} sortBy={sortBy} setSortBy={setSortBy} />
      <div className='py-4'>{renderContent()}</div>
    </section>
  )
}