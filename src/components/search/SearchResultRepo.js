import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//
import { selectById as selectResultById } from '../../slices/search'
import { saveFavorite, selectIds as selectFavoriteIds} from '../../slices/favorites'

export const SearchResultRepo = ({ repoId }) => {
  const dispatch = useDispatch()

  const repo = useSelector(state => selectResultById(state, repoId))
  const favoriteIds = useSelector(selectFavoriteIds)

  const repoExistsInFavorites = favoriteIds.indexOf(repoId.toString()) > -1

  const handleSelect = () => {
    if (repoExistsInFavorites) {
      console.log('You already saved this repo.')
      return
    }

    if (favoriteIds.length === 10) {
      console.log('You can only save up to 10 repos.')
      return
    }

    const formattedItem = {
      id: repo.id.toString(),
      fullName: repo.full_name,
      createdAt: repo.created_at,
      stargazersCount: repo.stargazers_count,
      language: repo.language,
      url: repo.url
    }

    dispatch(saveFavorite(JSON.stringify(formattedItem)))
  }

  return  (
    <li
      tabIndex={0}
      className='grid grid-cols-12 gap-x-2 items-center my-1 last-of-type:mb-0 p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100'
    >
      <span className='col-span-6'>{repo.full_name}</span>
      <span className='col-span-2 justify-self-end'>{repo.language}</span>
      <span className='col-span-2 justify-self-end'>{repo.stargazers_count} Stars</span>
      <span className='col-span-2 justify-self-end'>
        <button onClick={handleSelect} disabled={repoExistsInFavorites} aria-label={`Save repo`} title={repoExistsInFavorites ? 'Already saved' : 'Save'}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${repoExistsInFavorites ? 'text-red-600'  : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </span>
      <div className='col-span-6'>{repo.description}</div>
    </li>
  )
}