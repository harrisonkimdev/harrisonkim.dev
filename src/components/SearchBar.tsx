'use client'

import { useReducer, memo } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

// 상태 타입
type SearchState = {
  searchQuery: string
}

// 액션 타입
type SearchAction =
  | { type: 'SET_QUERY', payload: string }
  | { type: 'CLEAR_QUERY' }

// 리듀서 함수
const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'CLEAR_QUERY':
      return { ...state, searchQuery: '' }
    default:
      return state
  }
}

// 검색 입력 필드 컴포넌트
const SearchInput = memo(({
  searchQuery,
  onQueryChange
}: {
  searchQuery: string,
  onQueryChange: (value: string) => void
}) => (
  <input
    type='text' 
    id='searchQuery'
    value={searchQuery} 
    placeholder='Search...'
    onChange={e => onQueryChange(e.target.value)}
    className='w-64 p-2 rounded-tl-xl rounded-bl-xl border bg-white'
  />
))
SearchInput.displayName = 'SearchInput'

// 검색 버튼 컴포넌트
const SearchButton = memo(() => (
  <button 
    type='submit' 
    className='p-2 rounded-tr-xl rounded-br-xl bg-white'
  >
    <FaMagnifyingGlass />
  </button>
))
SearchButton.displayName = 'SearchButton'

const SearchBar = memo(({ searchSubmit }: { searchSubmit: Function }) => {
  // 초기 상태
  const initialState: SearchState = {
    searchQuery: ''
  }

  const [state, dispatch] = useReducer(searchReducer, initialState)
  const { searchQuery } = state

  const handleQueryChange = (value: string) => {
    dispatch({ type: 'SET_QUERY', payload: value })
  }

  const emitSearchQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchSubmit(searchQuery)
    dispatch({ type: 'CLEAR_QUERY' })
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={emitSearchQuery} className='flex flex-row'>
        <label htmlFor='searchQuery'></label>
        <SearchInput 
          searchQuery={searchQuery} 
          onQueryChange={handleQueryChange} 
        />
        <SearchButton />
      </form>
    </div>
  )
})
SearchBar.displayName = 'SearchBar'

export default SearchBar