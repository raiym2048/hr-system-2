import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import employerService from '../../services/employerService'

export type ReceivedData = {
  id: number
  respondedCount: number
  statusOfVacancy: string
  about_company: string
  position: string
  industry: string
  description: string
  skills: string
  typeOfEmploymentS: string
  requiredExperience: string
  country: string
  city: string
  street_house: string
  additionalInformation: string
  salaryResponse: {
    salarySum: number | string
    salaryType: string
    valute: string
  }
  contactInformationResponse: {
    city: string
    country: string
    idl: number
    street_house: string
  }
}

interface IInitialState {
  vacancy: ReceivedData | null
  status: string | null
  statusOfVacancy: string | null
}
export const getVacancyById = createAsyncThunk(
  'vacancy/getVacancyById',
  async (vacancyId: string, { rejectWithValue }) => {
    try {
      const result: ReceivedData = await employerService.getVacancyById(vacancyId)
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const putVacancyStatus = createAsyncThunk(
  'vacancy/putVacancyStatus',
  async ({ status: status, id: id }: { status: string; id: number }, { rejectWithValue }) => {
    try {
      await employerService.putVacancyStatus(status, id)
      return status
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const initialState: IInitialState = {
  vacancy: null,
  statusOfVacancy: null,
  status: null,
}
const vacancyByIdSlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getVacancyById.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getVacancyById.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.vacancy = action.payload
        state.statusOfVacancy = action.payload.statusOfVacancy
      })
      .addCase(getVacancyById.rejected, (state) => {
        state.status = 'rejected'
      })

      .addCase(putVacancyStatus.fulfilled, (state, action) => {
        state.statusOfVacancy = action.payload
      })
  },
})

export const selectVacancyStatus = (state: { vacancy: { status: string } }) => state.vacancy.status

export default vacancyByIdSlice
