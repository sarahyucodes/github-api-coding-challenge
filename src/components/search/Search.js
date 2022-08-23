import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { 
  fetchResults,
  removeAllResults, 
  resetSearchStatus,
  selectIds
} from '../../slices/search'

import { SearchResultRepo } from './SearchResultRepo'

export const Search = () => {
  const dispatch = useDispatch()

  const searchStatus = useSelector(state => state.search.status)
  const searchError = useSelector(state => state.search.error)
  const resultIds = useSelector(selectIds)
  
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

  const renderResults = () => {
    if (searchStatus === 'loading') {
      return <p className='loading-message p-2'>Loading...</p>
    } else if (searchStatus === 'failed') {
      return <p className='error-message p-2'>{searchError}</p>
    } else if (searchStatus === 'success') {
      return (
        <ul className='py-1'>
          { resultIds.map(repoId => <SearchResultRepo key={repoId} repoId={repoId} />) }               
        </ul>
      )
    }
  }

  return (
    <div className='border p-2 rounded-lg'>
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