import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { 
  fetchResults,
  removeAllResults, 
  resetSearchStatus,
  selectIds
} from '../../slices/search'

import { SearchResultRepo } from './SearchResultRepo'
import { Error } from '../error/Error'

const StatusMessage = ({ message, classNames }) => {
  return <p className={`${classNames} p-2`}>{message}</p>
}

export const Search = () => {
  const dispatch = useDispatch()

  let typingTimer = null

  const searchStatus = useSelector(state => state.search.status)
  const searchError = useSelector(state => state.search.error)
  const resultIds = useSelector(selectIds)

  const saveError = useSelector(state => state.favorites.saveError)

  useEffect(() => {
    clearTimeout(typingTimer)
  }, [typingTimer])
  
  const handleChange = searchTerm => {
    if (searchTerm.length === 0) {
      dispatch(removeAllResults())
      dispatch(resetSearchStatus())
    }

    clearTimeout(typingTimer)

    typingTimer = setTimeout(() => {
      if (searchTerm) dispatch(fetchResults(searchTerm))
    }, 500)
  }

  const renderResults = () => {
    if (searchStatus === 'loading') {
      return <StatusMessage message='Loading...' />
    } else if (searchStatus === 'failed') {
      return <StatusMessage message={searchError} classNames='error-message' />
    } else if (searchStatus === 'success') {
      if (resultIds.length === 0) {
        return <StatusMessage message='No results found.' />
      } else {
        return (
          <ul className='py-1'>
            { resultIds.map(repoId => <SearchResultRepo key={repoId} repoId={repoId} />) }               
          </ul>
        )
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <Error error={saveError} classNames='py1' />
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
    </div>
  )
}