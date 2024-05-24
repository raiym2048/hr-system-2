import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import employerService from "../../services/employerService";

interface IServerResponseObject {
    id?: number
    name: string
}

export interface IModifiedServerResponse {
    value: string
    label: string
}

interface IInitialState {
    experiences: IModifiedServerResponse[]
    educations: IModifiedServerResponse[]
    positions: IModifiedServerResponse[]
    popularPositions: string[]
    salaryType: IModifiedServerResponse[]
    category: IModifiedServerResponse[]
    currency: IModifiedServerResponse[]
    employmentType: IModifiedServerResponse[]
    isLoading: boolean
}

const modifyObjectForSelector = (array: IServerResponseObject[]) => {
    const modifiedArray = array.map(item => ({value: item.name, label: item.name}))
    return modifiedArray
}

const modifyStringForSelector = (array: string[]) => {
    const modifiedArray = array.map(item => ({value: item, label: item}))
    return modifiedArray
}

export const getPositions = createAsyncThunk(
    'employer/getPositions',
    async (_, {rejectWithValue}) => {
        try {
            const result: IServerResponseObject[] = await employerService.getPositions()
            return modifyObjectForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const getPopularPositions = createAsyncThunk(
    'employer/getPopularPositions',
    async (_, {rejectWithValue}) => {
        try {
            const response = await employerService.getPopularPositions()
            return response.data()
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)


export const getCategory = createAsyncThunk(
    'employer/getCategory',
    async (_, {rejectWithValue}) => {
        try {
            const result: IServerResponseObject[] = await employerService.getCategory()
            return modifyObjectForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)


export const getExperience = createAsyncThunk(
    'employer/getExperience',
    async (_, {rejectWithValue}) => {
        try {
            const result: IServerResponseObject[] = await employerService.getExperience()
            return modifyObjectForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)


export const getEducations = createAsyncThunk(
    'employer/getEducations',
    async (_, {rejectWithValue}) => {
        try {
            const result: IServerResponseObject[] = await employerService.getEducations()
            return modifyObjectForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
// export const getIndustries = createAsyncThunk(
//     'employer/getIndustries',
//     async (_, {rejectWithValue}) => {
//         try {
//             const result: IServerResponseObject[] = await employerService.getIndustries()
//             return modifyObjectForSelector(result)
//         } catch (error) {
//             return rejectWithValue((error as Error).message)
//         }
//     }
// )
export const getSalaryType = createAsyncThunk(
    'employer/getSalaryType',
    async (_, {rejectWithValue}) => {
        try {
            const result: string[] = await employerService.getSalaryType()
            return modifyStringForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
export const getCurrency = createAsyncThunk(
    'employer/getCurrency',
    async (_, {rejectWithValue}) => {
        try {
            const result: string[] = await employerService.getCurrency()
            return modifyStringForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
export const getEmploymentType = createAsyncThunk(
    'employer/getEmploymentType',
    async (_, {rejectWithValue}) => {
        try {
            const result: string[] = await employerService.getEmploymentType()
            return modifyStringForSelector(result)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

const initialState: IInitialState = {
    experiences: [],
    educations: [],
    positions: [],
    popularPositions: [],
    salaryType: [],
    category: [],
    currency: [],
    employmentType: [],
    isLoading: false,
}
const employerSlice = createSlice({
    name: 'employer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPositions.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getPositions.fulfilled, ((state, action) => {
                state.isLoading = false
                state.positions = action.payload
            }))
            .addCase(getPositions.rejected, (state => {
                state.isLoading = false
            }))

            .addCase(getEducations.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getEducations.fulfilled, ((state, action) => {
                state.isLoading = false
                state.educations = action.payload
            }))
            .addCase(getEducations.rejected, (state => {
                state.isLoading = false
            }))


            .addCase(getCategory.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getCategory.fulfilled, ((state, action) => {
                state.isLoading = false
                state.category = action.payload
            }))
            .addCase(getCategory.rejected, (state => {
                state.isLoading = false
            }))


            .addCase(getExperience.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getExperience.fulfilled, ((state, action) => {
                state.isLoading = false
                state.experiences = action.payload
            }))
            .addCase(getExperience.rejected, ((state) => {
                state.isLoading = false
            }))


            .addCase(getCurrency.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getCurrency.fulfilled, ((state, action) => {
                state.isLoading = false
                state.currency = action.payload
            }))
            .addCase(getCurrency.rejected, ((state) => {
                state.isLoading = false
            }))


            .addCase(getEmploymentType.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getEmploymentType.fulfilled, ((state, action) => {
                state.isLoading = false
                state.employmentType = action.payload
            }))
            .addCase(getEmploymentType.rejected, ((state) => {
                state.isLoading = false
            }))


            .addCase(getSalaryType.pending, (state => {
                state.isLoading = true
            }))
            .addCase(getSalaryType.fulfilled, ((state, action) => {
                state.isLoading = false
                state.salaryType = action.payload
            }))
            .addCase(getSalaryType.rejected, ((state) => {
                state.isLoading = false
            }))
    },
})

export default employerSlice

