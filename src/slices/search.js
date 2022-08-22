import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit'
//
import { search } from '../api/search'

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
    resetSearchStatus: state => { state.status = 'idle' }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchResults.pending, (state, action) => {
          state.status = 'loading'
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
          state.status = 'success'
          searchAdapter.setAll(state, action.payload.items.map(item => {
              return {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  html_url: item.html_url,
                  url: item.url,
                  language: item.language,
                  stargazers_count: item.stargazers_count,
                  created_at: item.created_at
              }
          }))
      })
      .addCase(fetchResults.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
      }) 
  }
})

export const {
  selectAll: selectAllSearch
} = searchAdapter.getSelectors(state => state.search)

export const {
  removeAllResults,
  resetSearchStatus
 } = searchSlice.actions

export default searchSlice.reducer