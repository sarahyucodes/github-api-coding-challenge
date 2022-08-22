import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { 
  fetchResults, 
  selectAllSearch, 
  removeAllResults, 
  resetSearchStatus 
} from '../../slices/search'

export const Search = () => {
  const dispatch = useDispatch()

  const status = useSelector(state => state.search.status)
  const error = useSelector(state => state.search.error)
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
    console.log(item)
  }

  const renderResults = () => {
    if (status === 'loading') {
      return <p className='p-2 text-sm'>Loading...</p>
    } else if (status === 'failed') {
      return <p className='p-2 text-sm'>{error}</p>
    } else if (status === 'success') {
      return (
        <ul className='py-1'>
          {
            results.map(result => {
              return (
                <li
                  key={result.id}
                  className='my-1 last-of-type:mb-0 p-2 cursor-pointer hover:bg-gray-100 rounded-lg grid grid-cols-8 gap-x-2 items-center' 
                  onClick={() => handleSelect(result)}
                >
                  <span className='col-span-6 mr-4'>{result.name}</span>
                  <span className='col-span-1 text-xs'>{result.language}</span>
                  <span className='col-span-1 text-xs flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className='ml-1'>{result.stargazers_count}</span>
                  </span>
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
        className={`w-full outline-0 px-2 ${status === 'success' ? 'border-b pb-2' : ''}`}
      />
      <div>
        {renderResults()}
      </div>
    </div>
  )
}