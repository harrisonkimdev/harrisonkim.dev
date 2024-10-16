'use client'

import { createContext, useContext, ReactNode, useReducer } from 'react'

interface AppState {
  showSideBar: boolean
}

type Action =
  | { type: 'SHOW_SIDEBAR' }
  | { type: 'HIDE_SIDEBAR' }

const initialState: AppState = {
  showSideBar: false
}

const AppStateContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

const appStateReducer = (
  state: AppState,
  action: Action
): AppState => {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return { ...state, showSideBar: true }
    case 'HIDE_SIDEBAR':
      return { ...state, showSideBar: false }
    default:
      return state
  }
}

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      { children }
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}