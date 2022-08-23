import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parseISO, format } from 'date-fns'
//
import { selectById, removeFavorite } from '../../slices/favorites'

export const FavoriteRepo = ({ favoriteId }) => {
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
    <li className='py-2 grid grid-cols-12 gap-x-2 items-center text-sm border-b last-of-type:border-b-0'>
      <span className='col-span-4'>{fullName}</span>
      <span className='col-span-2 justify-self-end'>{formattedDate}</span>
      <span className='col-span-2 justify-self-end'>{language}</span>
      <span className='col-span-2 justify-self-end'>{stargazersCount} Stars</span>
      <span className='col-span-2 justify-self-end'>
        <button className='border rounded px-2 py-1' onClick={handleRemove}>
          Remove
        </button>
      </span>
    </li>
  )
}