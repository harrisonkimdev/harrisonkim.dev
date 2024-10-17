'use client'

import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchBar = ({ searchSubmit }: { searchSubmit: Function }) => {
  const [searchQuery, setsearchQuery] = useState('')

  const emitSearchQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchSubmit(searchQuery)
    setsearchQuery('')
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={(e) => emitSearchQuery(e)} className='flex flex-row'>
        <label htmlFor='searchQuery'></label>
        <input
          type='text' id='searchQuery' name=''
          value={searchQuery} placeholder='Search...'
          onChange={e => setsearchQuery(e.target.value)}
          className='
            w-64 p-2 rounded-tl-xl rounded-bl-xl border bg-white
        '/>
        <button type='submit' className='
          p-2 rounded-tr-xl rounded-br-xl bg-white
        '>
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  )
}

export default SearchBar