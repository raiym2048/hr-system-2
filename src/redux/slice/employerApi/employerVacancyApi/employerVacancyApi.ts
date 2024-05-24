import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrl} from "../../../../services/commonVariables";
import {IEmployerVacancy} from "../type/type";
import registerService from "../../../../services/registration";
import {ISelectValue} from "../../../../pages/employer/EmployersVacancies/EmployersVacancies.tsx";

const token = {
    headers: {Authorization: registerService.user.token},
}


export const employerVacanciesApi = createApi({
    reducerPath: "getEmployerVacanciesSearch/employerVacancyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            if (token && token.headers && token.headers.Authorization) {
                headers.set('Authorization', token.headers.Authorization);
            }
            return headers;
        },
    }),
    refetchOnFocus: true,
    tagTypes: ['Vacancies'],
    endpoints: build => ({
        employerVacanciesSearch: build.query<IEmployerVacancy[], {
            user: string,
            search: string,
            filterData: ISelectValue
        }>({
            query: ({user, search, filterData}) => {
                function hasValue(obj: ISelectValue): boolean {
                    let bool = false
                    Object.values(obj).map((item) => {
                        item !== '' ? bool = true : bool
                    })
                    return bool
                }

                if (hasValue(filterData)) {
                   return({
                        url: `/vacancy/employer/vacancies/filter/${user}`,
                        params: {
                            respondedCount: filterData.respondedCount,
                            byDate: filterData.byDate,
                            byStatusOfVacancy: filterData.byStatusOfVacancy,

                        }
                    })
                }
                return `/vacancy/employer/vacancies/search/${user}?search=${search}`
            },
            providesTags: () => ['Vacancies'],
        }),
        updateVacancyStatus: build.mutation<IEmployerVacancy[], { chosenId: number, newStatus: string }>({
            query: ({chosenId, newStatus}) => ({
                url: `/vacancy/newStatusForVacancy/${chosenId}`,
                method: 'PUT',
                params: {
                    status: newStatus
                }
            }),
            invalidatesTags: ['Vacancies']
        }),
        deleteVacancy: build.mutation<void, number>({
            query: (vacancyId) => ({
                url: `/vacancy/delete/${vacancyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vacancies']
        }),

    })
})
export const {
    useEmployerVacanciesSearchQuery,
    useUpdateVacancyStatusMutation,
    useDeleteVacancyMutation,
} = employerVacanciesApi
