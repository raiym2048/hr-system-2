import axios from 'axios'
import {IMyVacanciesData} from './../../app/api/allVacanciesData'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {baseUrl} from '../../services/commonVariables'
import employerService from '../../services/employerService'
import registerService from "../../services/registration";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

const token = {
    headers: {Authorization: registerService.user.token},
}


export const getFetchVacancies = createAsyncThunk(
    'allVacancies/getFetchVacancies',
    async (user: any, {rejectWithValue}) => {
        try {
            const result: any = await employerService.getVacanciesByEmployer()
            return result
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const getAllVacanciesStatus = createAsyncThunk(
    'allVacancies/getAllVacanciesStatus',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUrl}/vacancy/statusOfVacancy`)
            console.log(response.data)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
export const getAllVacanciesSearch = createAsyncThunk(
    'allVacancies/getAllVacanciesSearch',
    async ({searchVacancies, user}: object, {rejectWithValue}) => {
        try {
            const response = await axios.get<IMyVacanciesData[]>(`${baseUrl}/vacancy/employer/vacancies/search/${user}?search=${searchVacancies}`, token)
            const data = response.data
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const putNewVacanciesStatus = createAsyncThunk(
    'allVacancies/putNewVacanciesStatus',
    async ({chosenId, newStatus}: object, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUrl}/vacancy/newStatusForVacancy/${chosenId}?status=${newStatus}`, null, token);
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const getAllVacanciesFilter = createAsyncThunk(
    'allVacancies/getAllVacanciesFilter',
    async ({user, status, res, creation}: object, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${baseUrl}/vacancy/employer/vacancies/filter/${user.user.id}?respondedCount=${res}&byDate=${creation}&byStatusOfVacancy=${status}`
            )
            console.log(response.data)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const deleteMyVacancy = createAsyncThunk(
    'allVacancies/deleteMyVacancy',
    async (vacancyId: number, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUrl}/vacancy/delete/${vacancyId}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

interface AllVacanciesData {
    vacancies: IMyVacanciesData[]
    statusVacancies: []
    newStatusVacancies: []
    isLoader: boolean
    error: string
    isEmpty: boolean
    statusLoader: boolean
    userId: number
}

const initialState: AllVacanciesData = {
    vacancies: [],
    statusVacancies: [],
    newStatusVacancies: [],
    isLoader: false,
    error: '',
    isEmpty: false,
    statusLoader: false,
    userId: 0,
}

const allVacancies = createSlice({
    name: 'allVacancies',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId === action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getFetchVacancies.pending, (state) => {
                state.isLoader = true
            })
            .addCase(getFetchVacancies.fulfilled, (state, action) => {
                state.isLoader = false
                state.error = ''
                state.vacancies = action.payload
            })
            .addCase(getFetchVacancies.rejected, (state) => {
                state.isLoader = false
                state.error = 'error'
            })

            .addCase(getAllVacanciesStatus.pending, (state) => {
                state.statusLoader = true
            })
            .addCase(getAllVacanciesStatus.fulfilled, (state, action) => {
                state.statusLoader = false
                state.error = ''
                state.statusVacancies = action.payload
            })
            .addCase(getAllVacanciesStatus.rejected, (state) => {
                state.statusLoader = false
                state.error = 'error'
            })

            .addCase(putNewVacanciesStatus.pending, (state) => {
                state.statusLoader = true
            })
            .addCase(putNewVacanciesStatus.fulfilled, (state, action) => {
                state.statusLoader = false
                state.error = ''
                state.newStatusVacancies = action.payload
            })
            .addCase(putNewVacanciesStatus.rejected, (state) => {
                state.statusLoader = false
                state.error = 'error'
            })

            .addCase(getAllVacanciesSearch.pending, (state) => {
                state.statusLoader = true
            })
            .addCase(getAllVacanciesSearch.fulfilled, (state, action: PayloadAction<IMyVacanciesData[]>) => {
                state.statusLoader = false
                state.error = ''
                state.vacancies = action.payload
            })
            .addCase(getAllVacanciesSearch.rejected, (state) => {
                state.statusLoader = false
                state.error = 'error'
            })

            .addCase(getAllVacanciesFilter.pending, (state) => {
                state.statusLoader = true
            })
            .addCase(getAllVacanciesFilter.fulfilled, (state, action) => {
                state.statusLoader = false
                state.error = ''
                state.vacancies = action.payload
            })
            .addCase(getAllVacanciesFilter.rejected, (state) => {
                state.statusLoader = false
                state.error = 'error'
            })

            .addCase(deleteMyVacancy.pending, (state) => {
                state.statusLoader = true
            })
            .addCase(deleteMyVacancy.fulfilled, (state) => {
                state.statusLoader = false
                state.error = ''
            })
            .addCase(deleteMyVacancy.rejected, (state) => {
                state.statusLoader = false
                state.error = 'error'
            })

    },
})
export const {setUserId} = allVacancies.actions
export default allVacancies.reducer
