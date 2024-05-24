import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import countryService from "../../services/countryService";

type TCountries = {
  id?: number
  name: string
  translations: {
    rus: { common: string }
  }
}

type TSortedCountries = {
  label: string
  value: string
}

type TInitialState = {
  countries: TSortedCountries[]
  isLoading: boolean
}

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async (_, {rejectWithValue})=>{
    try {      
      const receivedCountries: TCountries[] = await countryService.getCountries()    
      const sortedCountries = receivedCountries.map(item => {
        if (item.translations.rus.common === 'Киргизия') {
          return {label: 'Кыргызстан', value: 'Кыргызстан'}
        }
        else {
          return {label: item.translations.rus.common, value: item.translations.rus.common}
        }
      })?.sort((a, b) => {
        if (a.label < b.label) {
          return -1
        }
        else if (b.label < a.label) {
          return 1
        }
        else {
          return 0
        }
      }) 
      return sortedCountries
    }
    catch(error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const initialState : TInitialState= {
  countries: [],
  isLoading: false,
} 
const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getCountries.pending,(state=>{
      state.isLoading = true
    }))
    .addCase(getCountries.fulfilled, ((state,action)=>{
      state.isLoading = false
      state.countries = action.payload
    }))
    .addCase(getCountries.rejected,(state=>{
      state.isLoading = false
    }))
  },
})


export default countrySlice

