import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { 
  fetchResults,
  selectAllSearch, 
  removeAllResults, 
  resetSearchStatus
} from '../../slices/search'
import { saveFavorite } from '../../slices/favorites'

export const Search = () => {
  const dispatch = useDispatch()

  const searchStatus = useSelector(state => state.search.status)
  const searchError = useSelector(state => state.search.error)
  const results = useSelector(selectAllSearch)
  
  const handleChange = searchTerm => {
    if (searchTerm.length > 2) {
      setTimeout(() => {
        dispatch(fetchResults(searchTerm))
      }, 300)
    }

    if (searchTerm.length === 0) {
      dispatch(removeAllResults())
      dispatch(resetSearchStatus())
    }
  }

  const handleSelect = item => {
    const formattedItem = {
      id: item.id.toString(),
      fullName: item.full_name,
      createdAt: item.created_at,
      stargazersCount: item.stargazers_count,
      language: item.language,
      url: item.url
    }

    dispatch(saveFavorite(JSON.stringify(formattedItem)))
  }

  const renderResults = () => {
    if (searchStatus === 'loading') {
      return <p className='loading-message p-2 text-sm'>Loading...</p>
    } else if (searchStatus === 'failed') {
      return <p className='error-message p-2 text-sm'>{searchError}</p>
    } else if (searchStatus === 'success') {
      return (
        <ul className='py-1'>
          {
            results.map(result => {
              return (
                <li
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className='my-1 last-of-type:mb-0 p-2 cursor-pointer hover:bg-gray-100 rounded-lg'
                >
                  <div className='grid grid-cols-12 gap-x-2 items-center'>
                    <span className='col-span-8 mr-4 flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className='ml-2'>{result.full_name}</span>
                    </span>
                    <span className='col-span-2 text-xs justify-self-end'>{result.language}</span>
                    <span className='col-span-2 text-xs justify-self-end'>{result.stargazers_count} Stars</span>
                  </div>
                  <div className='text-xs pt-2 pl-2 ml-5'>{result.description}</div>
                </li>
              )
            })
          }               
        </ul>
      )
    }
  }

  return (
    <div className='border p-2 rounded-lg text-sm'>
      <input
        type='search'
        aria-label='search'
        name='search'
        placeholder='Search for a repository'
        onChange={e => handleChange(e.target.value)}
        className={`w-full outline-0 px-2 ${searchStatus === 'success' ? 'border-b pb-2' : ''}`}
      />
      <div>
        {renderResults()}
      </div>
    </div>
  )
}