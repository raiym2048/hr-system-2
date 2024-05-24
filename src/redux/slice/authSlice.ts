import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {authorizationHeader, baseUrl} from '../../services/commonVariables'

export interface IEmployerNotification{
    arrivedDate:string
    content:string
    id:number
    imageId:number
    title:string
    userId: number
}
export const employerRegister = createAsyncThunk(
    'auth/employerRegister',

    async (createEmp: object, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/auth/register/emp`, createEmp)
            const data = await response.data
            const users = JSON.stringify(data)
            localStorage.setItem('user', users)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const applicantRegister = createAsyncThunk(
    'auth/applicantRegister',
    async (createApplicant: object, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/auth/register/job`, createApplicant)
            const data = await response.data
            const users = JSON.stringify(data)
            localStorage.setItem('user', users)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
export const loginRegister = createAsyncThunk(
    'auth/loginRegister',
    async (login, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/auth/authenticate`, login)
            const data = await response.data
            const users = JSON.stringify(data)
            localStorage.setItem('user', users)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const employerProfile = createAsyncThunk(
    'auth/employerProfile',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUrl}/employer/profile/${id}`, authorizationHeader)
            const data = await response.data
            const profiles = JSON.stringify(data)
            localStorage.setItem('profile', profiles)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const jobProfile = createAsyncThunk(
    'auth/jobProfile',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${baseUrl}/job_seeker/get/job_seeker/myId/${id}`,
                authorizationHeader
            )
            const data = await response.data
            const profiles = JSON.stringify(data)
            localStorage.setItem('profile', profiles)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const getEmployerNotification = createAsyncThunk(
    'auth/getEmployerNotification',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUrl}/employer/notifications/${id}`)
            const data = await response.data
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
export const getJobNotification = createAsyncThunk(
    'auth/getJobNotification',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUrl}/job_seeker/notifications/${id}`)
            const data = await response.data
            console.log(data)
            return data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)



const initialState= {
    user: JSON.parse(localStorage.getItem('user') as string) || [],
    profile: JSON.parse(localStorage.getItem('profile') as string) || [],
    employerNotification: [],
    jobNotification: [],
    isLoader: false,
    error: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(employerRegister.pending, (state) => {
                state.isLoader = true
            })
            .addCase(employerRegister.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.user = action.payload)
            })
            .addCase(employerRegister.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(applicantRegister.pending, (state) => {
                state.isLoader = true
            })
            .addCase(applicantRegister.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.user = action.payload)
            })
            .addCase(applicantRegister.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(loginRegister.pending, (state) => {
                state.isLoader = true
            })
            .addCase(loginRegister.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.user = action.payload)
            })
            .addCase(loginRegister.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(employerProfile.pending, (state) => {
                state.isLoader = true
            })
            .addCase(employerProfile.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.profile = action.payload)
            })
            .addCase(employerProfile.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(jobProfile.pending, (state) => {
                state.isLoader = true
            })
            .addCase(jobProfile.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.profile = action.payload)
            })
            .addCase(jobProfile.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(getJobNotification.pending, (state) => {
                state.isLoader = true
            })
            .addCase(getJobNotification.fulfilled, (state, action) => {
                state.isLoader = false,state.jobNotification = action.payload

            })
            .addCase(getJobNotification.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
            .addCase(getEmployerNotification.pending, (state) => {
                state.isLoader = true
            })
            .addCase(getEmployerNotification.fulfilled, (state, action) => {
                ;(state.isLoader = false), (state.employerNotification = action.payload)
            })
            .addCase(getEmployerNotification.rejected, (state) => {
                ;(state.isLoader = false), (state.error = 'error')
            })
    },
})
export const {setUser, setProfile} = authSlice.actions

export default authSlice.reducer
