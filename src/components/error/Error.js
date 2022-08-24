import React from 'react'

export const Error = ({ error, classNames }) => {
  if (error) {
    return <div className={`self-end text-red-700 ${classNames}`}>*Error: {error}</div>
  } else {
    return null
  }
}