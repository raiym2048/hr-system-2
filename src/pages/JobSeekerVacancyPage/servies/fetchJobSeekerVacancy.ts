import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../../services/commonVariables";
import {IVacancues, IVacancy} from "../type/jobSeekerVacansySchema";
import registerService from "../../../services/registration";

const token = {
    headers: {Authorization: registerService.user.token},
}

export const fetchJobSeekerVacancy = createAsyncThunk(
    'vacancy/fetchJobSeekerVacancy',
    async function (_, {rejectWithValue}) {
        try {
            const response = await axios.get<IVacancy[]>(`${baseUrl}/vacancy/vacancies`, token)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }

    }
)

export const fetchJobSeekerVacancySearch = createAsyncThunk(
    'vacancy/fetchJobSeekerVacancySearch',
    async function (search: string, {rejectWithValue}) {
        try {
            const response = await axios.get(`${baseUrl}/vacancy/vacancy/search?search=${search}`, token)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)


export const fetchJobSeekerVacancyFilter = createAsyncThunk(
    'vacancy/fetchJobSeekerVacancyFilter',
    async function (filter: Record<string, string>, {rejectWithValue}) {
        const params = new URLSearchParams(filter)
        try {
            const response = await axios.get<IVacancues[]>(`${baseUrl}/vacancy/vacancy/filter?${params}`)
            return response.data
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)




