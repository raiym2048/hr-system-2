import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICandidate } from '../type/candidateSchema'
import axios from 'axios'
import { baseUrl } from '../../../services/commonVariables'
import registerService from '../../../services/registration'
const userId = registerService.user.id
export const fetchCandidateList = createAsyncThunk(
  'candidates/fetchCandidateList',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get<ICandidate[]>(`${baseUrl}/job_seeker/candidate/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchCandidateFavorite = createAsyncThunk(
  'candidates/fetchCandidateFavorite',
  async function (jobSeekerId: number, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.post(
        `${baseUrl}/job_seeker/candidate/favorite/${userId}?jobSeekerId=${jobSeekerId}`
      )
      dispatch(fetchCandidateSearch(''))
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)


export const fetchCandidateSearch = createAsyncThunk(
  'candidates/fetchCandidateSearch',
  async function (name: string, { rejectWithValue }) {
    const email = registerService.user.email
    try {
      const response = await axios.get<ICandidate[]>(
        `${baseUrl}/job_seeker/search?name=${name}&email=${email}`
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchCandidateFilter = createAsyncThunk(
  'candidates/fetchCandidateFilter',
  async function (filter: Record<string, string>, { rejectWithValue }) {
    const params = new URLSearchParams(filter)
    try {
      const response = await axios.get<ICandidate[]>(
        `${baseUrl}/job_seeker/candidate/filter?${params}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
