import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import employerService from '../../services/employerService'
import {TString} from '../../exportedTypes/basic'



export const getApplicationStatus = createAsyncThunk(
    'applicationStatus/getApplicationStatus',
    async (_, {rejectWithValue}) => {
        try {
            const result = employerService.getApplicationStatus()
            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const setApplicationStatus = createAsyncThunk(
    'applicationStatus/setApplicationStatus',
    async ({vacancyId, jobseekerId, status}: TString, {rejectWithValue}) => {
        try {
            const result = employerService.setApplicationStatus(vacancyId, jobseekerId, status)
            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

type TInitialState = {
    applicationStatus: string | null
    status: string | null
}

const initialState: TInitialState = {
    applicationStatus: null,
    status:''
}
const applicationStatusSlice = createSlice({
    name: 'applicationStatus',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getApplicationStatus.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getApplicationStatus.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.applicationStatus = action.payload
            })
            .addCase(getApplicationStatus.rejected, (state) => {
                state.status = 'rejected'
            })

    }
})

export default applicationStatusSlice
