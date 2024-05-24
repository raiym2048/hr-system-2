import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrl} from "../../../../services/commonVariables.tsx";
import {IResponceCandidate} from "../type/type.ts";
import {IFilter} from "../../../../pages/employer/ResponseCandidate/ResponseCandidate.tsx";


export const responseCandidate = createApi({
    reducerPath: "responseCandidate/api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ['ResponseCandidate'],
    endpoints: build => ({
        respondingCandidateSearch: build.query<IResponceCandidate[], { vacanciesId: string | undefined, names: string, filterDate: IFilter }>({
            query: ({vacanciesId, names, filterDate}) => {

                function hasValue(obj: IFilter): boolean {
                    let bool = false
                    Object.values(obj).map((item) => {
                        item !== '' ? bool = true : bool
                    })
                    return bool
                }
                if (hasValue(filterDate)) {
                    return({
                        url:`/job_seeker/list/responded/filter/${vacanciesId}`,
                        params:{
                            statusOfJobSeeker:filterDate.statusOfJobSeeker,
                            experience:filterDate.experience,
                            localDate:filterDate.localDate
                        }
                    })
                }
                return({
                    url: `/job_seeker/list/responded/search/${vacanciesId}`,
                    params:{
                        names:names
                    }
                })
            },
            providesTags: () => ['ResponseCandidate'],
        }),
        setStatusOfJobSeeker: build.mutation<void, { vacancyId: number, userId: number, status: string }>({
            query: ({vacancyId, userId, status}) => ({
                url: `/job_seeker/setStatusForJobSeeker/${vacancyId}/${userId}?status=${status}`,
                method: "PUT",
            }),
            invalidatesTags: ['ResponseCandidate']
        })
    })
})
export const {useRespondingCandidateSearchQuery,useSetStatusOfJobSeekerMutation} = responseCandidate
