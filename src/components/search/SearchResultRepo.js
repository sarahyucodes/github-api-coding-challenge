import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//
import { selectById as selectResultById } from '../../slices/search'
import { saveFavorite, selectIds as selectFavoriteIds} from '../../slices/favorites'

export const SearchResultRepo = ({ repoId }) => {
  const dispatch = useDispatch()

  const repo = useSelector(state => selectResultById(state, repoId))
  const favoriteIds = useSelector(selectFavoriteIds)

  const handleSelect = () => {
    if (favoriteIds.indexOf(repoId.toString()) > -1) {
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
      onClick={handleSelect}
      className='my-1 last-of-type:mb-0 p-2 cursor-pointer hover:bg-gray-100 rounded-lg'
    >
      <div className='grid grid-cols-12 gap-x-2 items-center'>
        <span className='col-span-8 mr-4 flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className='ml-2'>{repo.full_name}</span>
        </span>
        <span className='col-span-2 text-xs justify-self-end'>{repo.language}</span>
        <span className='col-span-2 text-xs justify-self-end'>{repo.stargazers_count} Stars</span>
      </div>
      <div className='text-xs pt-2 pl-2 ml-5'>{repo.description}</div>
    </li>
  )
}