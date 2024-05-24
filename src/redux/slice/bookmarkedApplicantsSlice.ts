import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import employerService from '../../services/employerService'
import { TStringOrNumber } from '../../exportedTypes/basic'


export const getBookmarkedApplicants = createAsyncThunk(
  'bookmarkedApplicants/getBookmarkedApplicants',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result: TStringOrNumber[] = await employerService.getBookmarkedApplicants(userId)
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const setIsApplicantBookmarked = createAsyncThunk(
  'bookmarkedApplicants/setIsApplicantBookmarked',
  async ({ userId, jobseekerId }: TStringOrNumber, { rejectWithValue }) => {
    try {      
      const result = await employerService.setFavourite(userId as string, jobseekerId as string)
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

type TInitialState = {
  bookmarkedApplicants: TStringOrNumber[]
  bookmarkedApplicantsStatus: string | null
  isApplicantBookmarked: boolean | null
  isApplicantBookmarkedStatus: string | null
}
const initialState: TInitialState = {
  bookmarkedApplicants: [],
  bookmarkedApplicantsStatus: null,
  isApplicantBookmarked: null,
  isApplicantBookmarkedStatus: null,
}
const bookmarkedApplicantsSlice = createSlice({
  name: 'bookmarkedApplicants',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBookmarkedApplicants.pending, (state) => {
        state.bookmarkedApplicantsStatus = 'pending'
      })
      .addCase(getBookmarkedApplicants.fulfilled, (state, action) => {
        state.bookmarkedApplicantsStatus = 'fulfilled'        
        state.bookmarkedApplicants = action.payload
      })
      .addCase(getBookmarkedApplicants.rejected, (state) => {
        state.bookmarkedApplicantsStatus = 'rejected'
      })
  },
})

// export const selectUserAppliedToVacancy = (state: { userAppliedToVacancy: { status: string } }) =>
//   state.userAppliedToVacancy.status

export default bookmarkedApplicantsSlice
