import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { fetchFavorites, selectAllFavorites } from '../../slices/favorites'

export const Favorites = () => {
  const dispatch = useDispatch()

  const fetchStatus = useSelector(state => state.favorites.fetchStatus)
  const fetchError = useSelector(state => state.favorites.fetchError)
  const favorites = useSelector(selectAllFavorites)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  const renderContent = () => {
    if (fetchStatus === 'loading') {
      return <p>Loading...</p>
    } else if (fetchStatus === 'failed') {
      return <p>{fetchError}</p>
    } else if (fetchStatus ==='success') {
      if (favorites.length === 0) {
        return <p>You don't have any favorites saved!</p>
      } else {
        return (
          <ul>
            {
              favorites.map(item => {
                return (
                  <li key={item.id}>{item.fullName}</li>
                )
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