import axios from 'axios'
import { baseUrl } from './commonVariables'
import registerService from './registration'
import { authorizationHeader } from '../services/commonVariables'

const updateProfile = async (obj: object) => {
  const response = await axios.post(
    `${baseUrl}/job_seeker/update/jobseeker/${registerService.user.id}`,
    obj,
    authorizationHeader
  )
  return response.data
}

const getProfile = async (id: string) => {
  const response = await axios.get(
    `${baseUrl}/job_seeker/get/job_seeker/myId/${id}`,
    authorizationHeader
  )
  return response.data
}

const getRecommendedVacancies = async (id: string) => {
  const response = await axios.get(
    `${baseUrl}/vacancy/sortedTwoSameVacancy/${id}`,
    authorizationHeader
  )
  return response.data
}

const putApplicationForAVacancy = async (vacancyId: string) => {
  const response = await axios.put(
    `${baseUrl}/job_seeker/responded/${vacancyId}/${registerService.user.id}`,
    authorizationHeader
  )
  return response.data
}

const getUserAppliedToVacancy = async (vacancyId: string) => {
  const response = await axios.get(
    `${baseUrl}/vacancy/statusOfvacancy/forJob_seeker?vacancyId=${vacancyId}`,
    authorizationHeader
  )
  return response.data
}


const applicantService = {
  updateProfile,
  getProfile,
  getRecommendedVacancies,
  putApplicationForAVacancy,
  getUserAppliedToVacancy,
}

export default applicantService
