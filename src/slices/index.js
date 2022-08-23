import { combineReducers, configureStore } from '@reduxjs/toolkit'
//
import searchReducer from './search'
import favoritesReducer from './favorites'

export const rootReducer = combineReducers({
    search: searchReducer,
    favorites: favoritesReducer
})

export default configureStore({
    reducer: rootReducer
})