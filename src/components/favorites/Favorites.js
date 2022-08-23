import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { fetchFavorites, selectAllFavorites } from '../../slices/favorites'

export const Favorites = () => {
  const dispatch = useDispatch()

  const status = useSelector(state => state.favorites.status)
  const error = useSelector(state => state.favorites.error)
  const favorites = useSelector(selectAllFavorites)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [])

  const renderContent = () => {
    if (status === 'loading') {
      return <p>Loading...</p>
    } else if (status === 'failed') {
      return <p>{error}</p>
    } else if (status ==='success') {
      if (favorites.length === 0) {
        return <p>You don't have any favorites saved!</p>
      } else {
        return (
          <ul>
            {
              favorites.map(item => {
                <li key={item.id}>{item.fullName}</li>
              })
            }
          </ul>
        )
      }
    }
  }

  return (
    <section className='Favorites py-10'>
      <h2 className='text-xl'>My Favorite Repositories</h2>
      <div>{renderContent()}</div>
    </section>
  )
}