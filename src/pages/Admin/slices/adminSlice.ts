import {createSlice} from '@reduxjs/toolkit'
import {
    AdminUserState,
    IAdminSupport,
    IAdminUser,
    IAdminVacancy,
     IUserDetail
} from "../type/adminSchema";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {
    fetchAdminAllUserBlocked,
    fetchAdminDetail,
    fetchAdminSetRoleForUser,
    fetchAdminSupport,
    fetchAdminUser,
    fetchAdminUserBlocked,
    fetchAdminUserDelete,
    fetchAdminVacancy,
    fetchAdminVacancyDelete
} from "../services/fetchAdminUser";

const initialState: AdminUserState = {
    admin_user: [],
    admin_vacancy: [],
    adminSupport:[],
    user_detail: null,
    selectedUserIds: [],
    allVacancyIds: [],
    isLoading: false,
    error: '',
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        saveSelectedUserIds: (state, action: PayloadAction<number[]>) => {
            state.selectedUserIds = action.payload;
        },
        saveSelectedVacancyIds: (state, action: PayloadAction<number[]>) => {
            state.allVacancyIds = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            //GET ALL ADMIN USERS
            .addCase(fetchAdminUser.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminUser.fulfilled.type, (state, action: PayloadAction<IAdminUser[]>) => {
                state.isLoading = false
                state.error = ''
                state.admin_user = action.payload
            })
            .addCase(fetchAdminUser.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            //GET ALL ADMIN USERS

            //DELETE ADMIN USER
            .addCase(fetchAdminUserDelete.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminUserDelete.fulfilled.type, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(fetchAdminUserDelete.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            //DELETE ADMIN USER

            //GET ALL ADMIN VACANCY
            .addCase(fetchAdminVacancy.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminVacancy.fulfilled.type, (state, action: PayloadAction<IAdminVacancy[]>) => {
                state.isLoading = false
                state.error = ''
                state.admin_vacancy = action.payload
            })
            .addCase(fetchAdminVacancy.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            //GET ALL ADMIN VACANCY

            //DELETE ADMIN VACANCY
            .addCase(fetchAdminVacancyDelete.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminVacancyDelete.fulfilled.type, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(fetchAdminVacancyDelete.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            //DELETE ADMIN VACANCY

            //DETAIL ADMIN
            .addCase(fetchAdminDetail.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminDetail.fulfilled.type, (state, action: PayloadAction<IUserDetail>) => {
                state.isLoading = false
                state.error = ''
                state.user_detail = action.payload
            })
            .addCase(fetchAdminDetail.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            //DETAIL ADMIN

            // ADMIN USER BLOCKED
            .addCase(fetchAdminUserBlocked.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminUserBlocked.fulfilled.type, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(fetchAdminUserBlocked.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            // ADMIN USER BLOCKED

            // ADMIN USER ALL BLOCKED
            .addCase(fetchAdminAllUserBlocked.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminAllUserBlocked.fulfilled.type, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(fetchAdminAllUserBlocked.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
            // ADMIN USER ALL BLOCKED

            // ADMIN USER SET ROLE
            .addCase(fetchAdminSetRoleForUser.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminSetRoleForUser.fulfilled.type, (state,action:PayloadAction<IUserDetail>) => {
                state.isLoading = false
                state.error = ''
                state.user_detail=action.payload
            })
            .addCase(fetchAdminSetRoleForUser.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
        // ADMIN USER SET ROLE

            // ADMIN USER SUPPORT
            .addCase(fetchAdminSupport.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAdminSupport.fulfilled.type, (state,action:PayloadAction<IAdminSupport[]>) => {
                console.log('user duulat')
                state.isLoading = false
                state.error = ''
                state.adminSupport=action.payload
            })
            .addCase(fetchAdminSupport.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = true
                state.error = action.payload
            })
        // ADMIN USER SUPPORT

    },
})
export const {saveSelectedUserIds, saveSelectedVacancyIds} = adminSlice.actions;
export default adminSlice.reducer
