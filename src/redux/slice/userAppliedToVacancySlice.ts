import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import applicantService from '../../services/applicantService'
             
export const getUserAppliedToVacancy = createAsyncThunk(
  'vacancy/getUserAppliedToVacancy',
  async (vacancyId: string, { rejectWithValue }) => {
    try {
      const result: boolean = await applicantService.getUserAppliedToVacancy(vacancyId)
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

type TInitialState = {
  userAppliedToVacancy: boolean | null
  status: string | null
}
const initialState : TInitialState= {
  userAppliedToVacancy: null,
  status: null,
} 
const userAppliedToVacancySlice = createSlice({
  name: 'userAppliedToVacancy',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getUserAppliedToVacancy.pending,(state=>{
      state.status = 'pending'
    }))
    .addCase(getUserAppliedToVacancy.fulfilled, ((state, action)=>{
      state.status = 'fulfilled'
      state.userAppliedToVacancy = action.payload
    }))
    .addCase(getUserAppliedToVacancy.rejected,(state=>{
      state.status = 'rejected'
    }))    
  },
})

export const selectUserAppliedToVacancy = (state: { userAppliedToVacancy: { status: string; }; }) => state.userAppliedToVacancy.status 

export default userAppliedToVacancySlice