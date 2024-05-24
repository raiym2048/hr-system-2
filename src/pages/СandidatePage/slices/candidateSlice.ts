import { createSlice } from '@reduxjs/toolkit'
import {
  fetchCandidateFavorite,
  fetchCandidateFilter,
  fetchCandidateList,
  fetchCandidateSearch,
} from '../services/fetchCandidateList'
import { CandidateState, ICandidate } from '../type/candidateSchema'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

const initialState: CandidateState = {
  candidates: [],
  isLoading: false,
  error: '',
}

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // GET ALL CANDIDATE
      .addCase(fetchCandidateList.pending.type, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCandidateList.fulfilled.type, (state, action: PayloadAction<ICandidate[]>) => {
        state.isLoading = false
        state.error = ''
        state.candidates = action.payload
      })
      .addCase(fetchCandidateList.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = true
        state.error = action.payload
      })
      // GET ALL CANDIDATE

      // FAVORITE
      .addCase(fetchCandidateFavorite.pending.type, (state) => {
        state.isLoading = true
      })

      .addCase(fetchCandidateFavorite.fulfilled.type, (state) => {
        state.isLoading = false
        state.error = ''
      })
      .addCase(fetchCandidateFavorite.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = true
        state.error = action.payload
      })
      // FAVORITE

      // SEARCH
      .addCase(fetchCandidateSearch.pending.type, (state) => {
        state.isLoading = true
      })

      .addCase(
        fetchCandidateSearch.fulfilled.type,
        (state, action: PayloadAction<ICandidate[]>) => {
          state.isLoading = false
          state.error = ''
          state.candidates = action.payload
        }
      )
      .addCase(fetchCandidateSearch.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = true
        state.error = action.payload
      })
      // SEARCH

      //FILTER
      .addCase(fetchCandidateFilter.pending.type, (state) => {
        state.isLoading = true
      })

      .addCase(
        fetchCandidateFilter.fulfilled.type,
        (state, action: PayloadAction<ICandidate[]>) => {
          state.isLoading = false
          state.error = ''
          state.candidates = action.payload
        }
      )
      .addCase(fetchCandidateFilter.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = true
        state.error = action.payload
      })
    //FILTER
  },
})
export default candidateSlice.reducer
