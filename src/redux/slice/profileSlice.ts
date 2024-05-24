import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employerService from "../../services/employerService";


type TReceivedData = {
  aboutCompany: string,
  address: string,
  city: string,
  companyName: string,
  country: string
  email: string,
  phoneNumber: string,
  fileResponse: {
    id: number,
    name: string,
    type: string,
    fileData: string[],
    jobSeekerId: number,
    path: string,
  }
}

type TInitialState = {
  profile: {
    fileResponse: {
      path: string
      name: string
    }
  } | null
  status: string | null
}


export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, {rejectWithValue})=>{
    try {
      const response: TReceivedData = await employerService.getProfile()
      const profileData = {
        aboutCompany: response.aboutCompany,
        address: response.address,
        city: response.city,
        companyName: response.companyName,
        country: {label: response.country, value: response.country},
        email: response.email,
        phoneNumber: response.phoneNumber,
        fileResponse: response.fileResponse,
      }
      return profileData
    }
    catch(error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const initialState : TInitialState= {
  profile: null,
  status: null,
}
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getProfile.pending,(state=>{
      state.status = 'pending'
    }))
    .addCase(getProfile.fulfilled, ((state,action)=>{
      state.status = 'fulfilled'
      console.log('this is action'+action.payload)
      state.profile = action.payload
    }))
    .addCase(getProfile.rejected,(state=>{
      state.status = 'rejected'
    }))
  },
})


export const selectProfileStatus = (state: { profile: { status: string; }; }) => state.profile
export default profileSlice

