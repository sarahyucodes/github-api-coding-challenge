import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parseISO, format } from 'date-fns'
//
import { selectById, removeFavorite } from '../../slices/favorites'

export const FavoritesListItem = ({ favoriteId, gridClasses }) => {
  const dispatch = useDispatch()

  const favorite = useSelector(state => selectById(state, favoriteId))

  const {
    fullName,
    createdAt,
    language,
    stargazersCount
  } = favorite

  const date = parseISO(createdAt)
  const formattedDate = format(date, 'MM/dd/yyyy')

  const handleRemove = () => {
    dispatch(removeFavorite(favoriteId))
  }

  return (
    <li className={`${gridClasses.grid} last-of-type:border-b-0`}>
      <span className={`${gridClasses.gridItem.name} break-all`}>{fullName}</span>
      <span className={gridClasses.gridItem.other.default}>{formattedDate}</span>
      <span className={gridClasses.gridItem.other.mobileHidden}>{language}</span>
      <span className={gridClasses.gridItem.other.default}>{stargazersCount}</span>
      <span className={gridClasses.gridItem.other.default}>
        <button 
          onClick={handleRemove}
          className='border rounded px-2 py-1 w-20 hover:border-blue-700 hover:text-blue-700' 
        >
          Remove
        </button>
      </span>
    </li>
  )
}