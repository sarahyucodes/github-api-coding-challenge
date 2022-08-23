import React from 'react'

export const SortFavorites = ({ 
  sortOptions, 
  sortBy, 
  setSortBy 
}) => {
  const handleClickSort = option => {
    setSortBy(option)
  }
  
  return (
    <div className='py-2'>
      <span className='font-medium'>Sort by:</span>
      { sortOptions.map(option => {
          return (
            <button 
              key={option} 
              onClick={() => handleClickSort(option)}
              disabled={option === sortBy ? true : false}
              className={`px-2 py-1 ${option === sortBy? 'text-blue-700 underline underline-offset-2' : 'hover:text-blue-700'}`}
            >
              {option}
          </button>
          )
        })
      }
    </div>
  )
}