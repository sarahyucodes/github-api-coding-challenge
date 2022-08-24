import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//
import { selectById as selectResultById } from '../../slices/search'
import { 
  saveFavorite, 
  selectIds as selectFavoriteIds,
  setSaveError
} from '../../slices/favorites'

export const SearchResultRepo = ({ repoId }) => {
  const dispatch = useDispatch()

  const repo = useSelector(state => selectResultById(state, repoId))
  const favoriteIds = useSelector(selectFavoriteIds)

  const repoExistsInFavorites = favoriteIds.indexOf(repoId.toString()) > -1

  const handleSelect = () => {
    if (favoriteIds.length === 10) {
      dispatch(setSaveError('You can only save up to 10 repos!'))
    }

    if (!repoExistsInFavorites && favoriteIds.length < 10) {
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
  }

  return  (
    <li
      tabIndex={0}
      className='grid grid-cols-12 gap-x-2 items-center my-1 last-of-type:mb-0 p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 text-xs md:text-sm'
    >
      <span className='col-span-6'>{repo.full_name}</span>
      <span className='hidden md:block col-span-2 justify-self-end'>{repo.language}</span>
      <span className='hidden md:block col-span-2 justify-self-end'>{repo.stargazers_count} Stars</span>
      <span className='col-span-6 md:col-span-2 justify-self-end'>
        <button 
          onClick={handleSelect} 
          disabled={repoExistsInFavorites} 
          className={`rounded px-2 py-1 w-20 transition ${repoExistsInFavorites ? 'bg-blue-700 text-white' : 'border hover:border-blue-700 hover:text-blue-700'}`}
        >
          {repoExistsInFavorites ? 'Saved' : 'Save'}
        </button>
      </span>
      <div className='hidden md:block md:col-span-6'>{repo.description}</div>
    </li>
  )
}