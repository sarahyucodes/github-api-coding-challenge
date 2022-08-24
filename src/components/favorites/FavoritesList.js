import React from 'react'
import { useSelector } from 'react-redux'
//
import { selectIds, selectAll } from '../../slices/favorites'

import { FavoritesListItem } from './FavoritesListItem'


const FavoritesListHeader = ({ gridClasses }) => {
  return (
    <div className={`${gridClasses.grid} font-medium`}>
      <div className={gridClasses.gridItem.name}>Name</div>
      <div className={gridClasses.gridItem.other.default}>Date Created</div>
      <div className={gridClasses.gridItem.other.mobileHidden}>Language</div>
      <div className={gridClasses.gridItem.other.default}>Stars</div>
    </div>
  )
}

export const FavoritesList = ({ sortBy, sortOptions }) => {
  const gridClasses = {
    grid: 'grid grid-cols-12 gap-x-2 items-center border-b py-2',
    gridItem: {
      name: 'col-span-3 md:col-span-4',
      other: {
        default: 'col-span-3 md:col-span-2 justify-self-end',
        mobileHidden: 'hidden md:block md:col-span-2 justify-self-end'
      }
    }
  }

  const allFavorites = useSelector(selectAll)
  const sortedByStars = useSelector(selectIds)
  const sortedByDate = allFavorites.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(item => item.id)

  let favoriteIds

  if (sortBy === sortOptions[0]) {
    favoriteIds = sortedByDate
  } else if (sortBy === sortOptions[1]) {
    favoriteIds = sortedByStars
  }

  return (
    <div>
      <FavoritesListHeader gridClasses={gridClasses} />
      <ul>
        { favoriteIds.map(favoriteId => (
          <FavoritesListItem
            key={favoriteId}
            favoriteId={favoriteId}
            gridClasses={gridClasses}
          />
        )) }
      </ul>
    </div>
  )
}