import React from 'react'
import { render, screen } from '@testing-library/react'
//
import { Error } from '../components/error/Error'

describe('<Error />', () => {
  it('should display the error message', () => {
    const errorMessage = 'error'
    render(<Error error={errorMessage}  />)

    expect(screen.getByText(`*Error: ${errorMessage}`)).toBeInTheDocument()
  })
})