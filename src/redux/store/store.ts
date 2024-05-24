import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import authSlice from '../slice/authSlice'
import employerSlice from '../slice/employerSlice'
import countrySlice from '../slice/countrySlice'
import statusSlice from '../slice/vacanciesStatus'
import candidateSlice from '../../pages/СandidatePage/slices/candidateSlice'
import jobSeekerVacancySlices from '../../pages/JobSeekerVacancyPage/slices/jobSeekerVacancySlices'
import allVacancies from '../slice/allVacanciesSlice'
import vacancyByIdSlice from '../slice/vacancyByIdSlice'
import profileSlice from '../slice/profileSlice'
import userAppliedToVacancySlice from '../slice/userAppliedToVacancySlice'
import bookmarkedApplicantsSlice from '../slice/bookmarkedApplicantsSlice'
import applicationStatusSlice from '../slice/applicationStatusSlice'
import candidatesStatus from '../slice/candidatesStatus'
import adminSlice from "../../pages/Admin/slices/adminSlice";
import chatSlice from '../slice/chatSlice'
import {employerVacanciesApi} from "../slice/employerApi/employerVacancyApi/employerVacancyApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {responseCandidate} from "../slice/employerApi/employerVacancyApi/employerResponceCandidateApi.ts";

export const store = configureStore({
    reducer: {
        authSlice,
        statusSlice,
        allVacancies,
        candidatesStatus,
        candidates: candidateSlice,
        vacancyJobSeeker: jobSeekerVacancySlices,
        admin: adminSlice,
        employer: employerSlice.reducer,
        countries: countrySlice.reducer,
        vacancy: vacancyByIdSlice.reducer,
        profile: profileSlice.reducer,
        userAppliedToVacancy: userAppliedToVacancySlice.reducer,
        bookmarkedApplicants: bookmarkedApplicantsSlice.reducer,
        applicationStatus: applicationStatusSlice.reducer,
        chatInformation: chatSlice.reducer,
        [employerVacanciesApi.reducerPath]: employerVacanciesApi.reducer,
        [responseCandidate.reducerPath]:responseCandidate.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employerVacanciesApi.middleware,responseCandidate.middleware),


})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
