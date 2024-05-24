import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../../services/commonVariables";
import {IAdminSupport, IAdminUser,IUserDetail} from "../type/adminSchema";
import {IUserInput} from "../AdminUser/UserDetail/UserDetail";
 //GET ADMIN USER
export const fetchAdminUser = createAsyncThunk(
    'admin/fetchAdminUser',
    async function (search:Record<string, string>, {rejectWithValue}) {
        const params = new URLSearchParams(search)
        try {
            const response = await axios.get<IAdminUser[]>(`${baseUrl}/admin/get/all/usersBySearch/?${params}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
//GET ADMIN USER

// DELETE ADMIN USER
export const fetchAdminUserDelete = createAsyncThunk(
        'admin/fetchAdminUserDelete',
        async function (selectedUserIds:number[], {rejectWithValue,dispatch}) {
            const params = new URLSearchParams();
            selectedUserIds.forEach((userId) => {
                params.append('selectedUserIds', userId.toString());
            });
            try {
                const response = await axios.delete<string>(`${baseUrl}/admin/processSelectedUsers?${params.toString()}`)
                dispatch(fetchAdminUser({}))
                return response.data
            } catch (error) {
                return rejectWithValue((error as Error).message)
            }
        }
    )
// DELETE ADMIN USER

// GET ADMIN VACANCY
export const fetchAdminVacancy = createAsyncThunk(
    'admin/export const fetchAdminVacancy = createAsyncThunk(\n',
    async function (search:Record<string, string>, {rejectWithValue}) {
        const params = new URLSearchParams(search);
        try {
            const response = await axios.get<string>(`${baseUrl}/admin/get/all/vacancies/BySearch?${params}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
// GET ADMIN VACANCY

// DELETE ADMIN USER
export const fetchAdminVacancyDelete = createAsyncThunk(
    'admin/fetchAdminVacancyDelete',
    async function (selectedUserIds: number[], {rejectWithValue,dispatch}) {
        const params = new URLSearchParams();
        selectedUserIds.forEach((userId) => {
            params.append('selectedVacancyIds', userId.toString());
        });
        try {
            const response = await axios.delete<string>(`${baseUrl}/admin/processSelectedVacancy?${params.toString()}`)
            dispatch(fetchAdminVacancy({}))
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
// DELETE ADMIN USER


// DETAIL ADMIN USER
export const fetchAdminDetail = createAsyncThunk(
    'admin/fetchAdminDetail',
    async function (id:string, {rejectWithValue}) {
        try {
            const response = await axios.get<IUserDetail>(`${baseUrl}/admin/get/userById/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
// DETAIL ADMIN USER


// DETAIL ADMIN USER
export const fetchAdminUserBlocked = createAsyncThunk(
    'admin/fetchAdminUserBlocked',
    async function (obj:Record<string, string | IUserInput>, {rejectWithValue}) {
    const {
        userById,blockedRequestBody}=obj
        try {
            const response = await axios.put<Record<string, boolean>>(`${baseUrl}/admin/setBlockedForUser/${userById}`,blockedRequestBody)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
// DETAIL ADMIN USER

export const fetchAdminAllUserBlocked = createAsyncThunk(
        'admin/fetchAdminAllUserBlocked',
        async function (requestBody:Record<string, string | boolean>, {rejectWithValue}) {
            const {userById,aBoolean}=requestBody

            try {
                const response = await axios.put<boolean>(`${baseUrl}/admin/setBlockedUserByUserID/${userById}?aBoolean=${aBoolean}`)
                return response.data
            } catch (error) {
                return rejectWithValue((error as Error).message)
            }
        }
    )


export const fetchAdminSetRoleForUser = createAsyncThunk(
    'admin/fetchAdminSetRoleForUser',
    async function (requestBody:Record<string, string>, {rejectWithValue}) {
        const {userId, role}=requestBody
        console.log(userId)
        try {
            const response = await axios.put<IUserDetail>(`${baseUrl}/admin/setRoleForUser/${userId}?role=${role}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)


export const fetchAdminSupport = createAsyncThunk(
    'admin/fetchAdminSupport',
    async function (_,{rejectWithValue}) {
        try {
            const response = await axios.get<IAdminSupport[]>
            (`${baseUrl}/admin/get/list/support`)
            console.log(response.data)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)
