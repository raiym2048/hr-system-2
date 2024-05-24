import axios from 'axios'
import { baseUrl } from './commonVariables'
import registerService from './registration'
import { modifyTypeOfEmployments } from '../helpers/modifyTypeOfEmployments'

const authorizationHeader = {
  headers: { Authorization: registerService.user.token },
}

const getExperience = async () => {
  const response = await axios.get(`${baseUrl}/employer/experience`, authorizationHeader)
  return response.data
}

const getPositions = async () => {
  const response = await axios.get(`${baseUrl}/employer/positions`, authorizationHeader)
  return response.data
}

const getSalaryType = async () => {
  const response = await axios.get(`${baseUrl}/employer/salaryType`, authorizationHeader)
  return response.data
}


const getCategory = async () => {
  const response = await axios.get(`${baseUrl}/category/categories`, authorizationHeader)
  return response.data
}

const getEducations = async () => {
  const response = await axios.get(`${baseUrl}/employer/educations`)
  return response.data
}
const getCurrency = async () => {
  const response = await axios.get(`${baseUrl}/employer/getValute`, authorizationHeader)
  return response.data
}

const getEmploymentType = async () => {
  const response = await axios.get(`${baseUrl}/employer/typeofEmployments`, authorizationHeader)
  const modifiedResponse = modifyTypeOfEmployments(response.data)
  return modifiedResponse as string[]
}

const addVacancy = async (newObject: object) => {
  const response = await axios.post(
    `${baseUrl}/vacancy/vacancy/${registerService.user.id}`,
    newObject,
    authorizationHeader
  )

  return response.data
}

const getVacanciesByEmployer = async () => {
  const response = await axios.get(
    `${baseUrl}/vacancy/vacancies/${registerService.user.id}`,
    authorizationHeader
  )
  return response.data
}

const getVacancyById = async (vacancyId: string) => {
  const response = await axios.get(`${baseUrl}/vacancy/vacancy/${vacancyId}`, authorizationHeader)
  return response.data
}

const updateVacancy = async (obj: object, vacancyId: string) => {
  const response = await axios.post(
    `${baseUrl}/vacancy/update/vacancy/${vacancyId}`,
    obj,
    authorizationHeader
  )
  return response.data
}

const removeVacancyById = async (vacancyId: number) => {
  const response = await axios.delete(`${baseUrl}/vacancy/delete/${vacancyId}`, authorizationHeader)
  return response.data
}

const getVacancyStatus = async () => {
  const response = await axios.get(`${baseUrl}/vacancy/statusOfVacancy`, authorizationHeader)
  return response.data
}

const putVacancyStatus = async (status: string, vacancyId: number) => {
  const response = await axios.put(
    `${baseUrl}/vacancy/newStatusForVacancy/${vacancyId}?status=${status}`,
    {},
    authorizationHeader
  )
  return response.data
}

const getProfile = async () => {
  const response = await axios.get(
    `${baseUrl}/employer/profile/${registerService.user.id}`,
    authorizationHeader
  )
  return response.data
}

const updateProfile = async (obj: object) => {
  const response = await axios.post(
    `${baseUrl}/employer/update/employer/${registerService.user.id}`,
    obj
  )
  return response.data
}

const setFavourite = async (userId: string, jobSeekerId: string) => {
  const response = await axios.post(
    `${baseUrl}/job_seeker/candidate/favorite/${userId}?jobSeekerId=${jobSeekerId}`,
    authorizationHeader
  )
  return response.data
}

const getBookmarkedApplicants = async (userId: string) => {
  const response = await axios.get(`${baseUrl}/job_seeker/candidate/favorites/${userId}`)
  return response.data
}

const getApplicationStatus = async () => {
  const response = await axios.get(`${baseUrl}/job_seeker/statusOfJobSeekerForVacancy`)
  return response.data
}

const setApplicationStatus = async (vacancyId: string, jobseekerId: string, status: string) => {
  const response = await axios.put(
    `${baseUrl}/job_seeker/setStatusForJobSeeker/${vacancyId}/${jobseekerId}?status=${status}`,
    authorizationHeader
  )
  return response.data
}

const employerService = {
  getExperience,
  getPositions,
  getSalaryType,
  getCurrency,
  getEmploymentType,
  addVacancy,
  getVacanciesByEmployer,
  getVacancyById,
  removeVacancyById,
  getVacancyStatus,
  putVacancyStatus,
  updateVacancy,
  getProfile,
  updateProfile,
  getEducations,
  getCategory,
  setFavourite,
  getBookmarkedApplicants,
  getApplicationStatus,
  setApplicationStatus,
}

export default employerService
