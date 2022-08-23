import React from 'react'
//
import { Search } from './components/search/Search'
import { Favorites } from './components/favorites/Favorites'

const App = () => {
  return (
    <div className='container mx-auto px-4 py-10'>
      <header className='py-4'>
        <h1 className='text-2xl'>GitHub Repositories</h1>
      </header>
      <main className='py-4'>
        <Search />
        <Favorites />
      </main>
    </div>
  )
}

export default App
