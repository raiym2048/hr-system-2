import { createSlice } from '@reduxjs/toolkit'
import {IVacancues, JobSeekerVacancyState} from '../type/jobSeekerVacansySchema'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import {
  fetchJobSeekerVacancyFilter,
  fetchJobSeekerVacancySearch,
} from '../servies/fetchJobSeekerVacancy'

const initialState: JobSeekerVacancyState = {
  vacancy_list: [],
  isLoading: false,
  error: '',
}

const jobSeekerVacancySlices = createSlice({
  name: 'vacancy_list',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //GET ALL VACANCY
      // .addCase(fetchJobSeekerVacancy.pending.type, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(fetchJobSeekerVacancy.fulfilled.type, (state, action: PayloadAction<IVacancy[]>) => {
      //   state.isLoading = false
      //   state.error = ''
      //   state.vacancy_list = action.payload
      // })
      // .addCase(fetchJobSeekerVacancy.rejected.type, (state, action: PayloadAction<string>) => {
      //   state.isLoading = true
      //   state.error = action.payload
      // })
      //GET ALL VACANCY

      //SEARCH  VACANCY
      .addCase(fetchJobSeekerVacancySearch.pending.type, (state) => {
        state.isLoading = true
      })
      .addCase(fetchJobSeekerVacancySearch.fulfilled.type, (state, action: PayloadAction<IVacancues[]>) => {
        state.isLoading = false
        state.error = ''
        state.vacancy_list = action.payload
      })
      .addCase(
        fetchJobSeekerVacancySearch.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = true
          state.error = action.payload
        }
      )
      //SEARCH  VACANCY

      //FILTER  VACANCY
      .addCase(fetchJobSeekerVacancyFilter.pending.type, (state) => {
        state.isLoading = true
      })
      .addCase(fetchJobSeekerVacancyFilter.fulfilled.type, (state, action: PayloadAction<IVacancues[]>) => {
        state.isLoading = false
        state.error = ''
        state.vacancy_list = action.payload
      })
      .addCase(
        fetchJobSeekerVacancyFilter.rejected.type, (state, action: PayloadAction<string>) => {
          state.isLoading = true
          state.error = action.payload
        }
      )
      //FILTER  VACANCY
  },
})

export default jobSeekerVacancySlices.reducer
