import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../../services/commonVariables'
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

export const putCandidatesStatus = createAsyncThunk(
  'statusCandidates/putCandidatesStatus',
  async ({ status, vacanciesId, usersId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/job_seeker/setStatusForJobSeeker/${vacanciesId}/${usersId}?status=${status}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getFetchCandidates = createAsyncThunk(
  'statusCandidates/getFetchCandidates',
  async ({vacanciesId,names}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/job_seeker/list/responded/search/${vacanciesId}?names=${names}`)
      console.log(vacanciesId)
      const data = response.data
      console.log(data)
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const getCandidatesSearch = createAsyncThunk(
  'statusCandidates/getCandidatesSearch',
  async ({ userId, value }: object, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/vacancy/list/job_seekers/responded/vacancies/search/${userId}?search=${value}`
      )
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getCandidatesFilter = createAsyncThunk(
  'statusCandidates/getCandidatesFilter',
  async ({ user, date }: object, { rejectWithValue }) => {
    const params=new URLSearchParams(date)
    try {
      const response = await axios.get<IRespondingVacancies[]>(`${baseUrl}/vacancy/list/job_seekers/responded/vacancies/filter/${user}?${params}`)
      const data = response.data
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
interface IImage  {
  id: number,
  name: string,
  type: string,
  fileData: string[],
  jobSeekerId: number,
  path: string
}
export interface IRespondingVacancies {
  applicationDate: string
  category: string
  companyName: string
  image: IImage
  position: string
  statusOfJobSeeker: string
  vacancyId: number
}

interface AllVacanciesData {
  statusUser: string
  isLoader: boolean
  error: string
  isEmpty: boolean
  statusLoader: boolean
  candidatesVacancies: IRespondingVacancies[]
}

const initialState: AllVacanciesData = {
  statusUser: '',
  isLoader: false,
  error: '',
  isEmpty: false,
  statusLoader: false,
  candidatesVacancies: [],
}

const statusCandidates = createSlice({
  name: 'statusCandidates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(putCandidatesStatus.pending, (state) => {
        state.isLoader = true
      })
      .addCase(putCandidatesStatus.fulfilled, (state, action) => {
        state.isLoader = false
        state.error = ''
        state.statusUser = action.payload
      })
      .addCase(putCandidatesStatus.rejected, (state) => {
        state.isLoader = false
        state.error = 'error'
      })
      .addCase(getFetchCandidates.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getFetchCandidates.fulfilled, (state, action) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getFetchCandidates.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
      .addCase(getCandidatesSearch.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getCandidatesSearch.fulfilled, (state, action:PayloadAction<IRespondingVacancies[]>) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getCandidatesSearch.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
      .addCase(getCandidatesFilter.pending, (state) => {
        state.statusLoader = true
      })
      .addCase(getCandidatesFilter.fulfilled, (state, action:PayloadAction<IRespondingVacancies[]>) => {
        state.statusLoader = false
        state.error = ''
        state.candidatesVacancies = action.payload
      })
      .addCase(getCandidatesFilter.rejected, (state) => {
        state.statusLoader = false
        state.error = 'error'
      })
  },
})

export default statusCandidates.reducer
