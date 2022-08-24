import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit'
//
import { search } from '../services/search'

const searchAdapter = createEntityAdapter()

const initialState = searchAdapter.getInitialState({
  status: 'idle', // 'loading' | 'success' | 'failed'
  error: null
})

export const fetchResults = createAsyncThunk('search/fetchResults', async (query) => {
  const response = await search(query)
  return response.data
})

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    removeAllResults: searchAdapter.removeAll,
    resetSearchStatus: state => { state.status = 'idle' },
    setSearchStatusFailed: state => { state.status = 'failed' }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchResults.pending, (state, action) => { state.status = 'loading' })
      .addCase(fetchResults.fulfilled, (state, action) => {
          state.status = 'success'
          searchAdapter.setAll(state, action.payload.items)
      })
      .addCase(fetchResults.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
      }) 
  }
})

export const {
  selectIds,
  selectById
} = searchAdapter.getSelectors(state => state.search)

export const {
  removeAllResults,
  resetSearchStatus,
  setSearchStatusFailed
 } = searchSlice.actions

export default searchSlice.reducer