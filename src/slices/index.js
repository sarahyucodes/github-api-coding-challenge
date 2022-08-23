import { combineReducers, configureStore } from '@reduxjs/toolkit'
//
import searchReducer from './search'

export const rootReducer = combineReducers({
    search: searchReducer
})

export default configureStore({
    reducer: rootReducer
})