import axios from 'axios'
import { baseUrl } from './commonVariables'
import registerService from './registration'

// const authorizationHeader = {
//   headers: { Authorization: registerService.user.token },
// }

const updateLogo = async (file: FormData) => {
  const response = await axios.post(`${baseUrl}/file/image/upload/${registerService.user.id}`, file)
  return response.data
}

const updateResume = async (file: FormData) => {
  const response = await axios.post(`${baseUrl}/file/resume/upload/${registerService.user.id}`, file)
  return response.data
}

const getLogo = async (id: number) => {
  const response = await axios.get(`${baseUrl}/file/download/file/${id}`)
  return response.data
}

const getResume = async (id: number) => {
  const response = await axios.get(`${baseUrl}/file/resume/${id}`, { responseType: 'blob'})
  // const header = response.headers.get('Content-Disposition');
  return response.data
}

const postFileForChat = async (file: FormData) => {
  const response = await axios.post(`${baseUrl}/file/chat/upload/${registerService.user.id}`, file)
  return response.data
}


const fileService = { 
  updateLogo, 
  updateResume,
  getLogo,
  getResume,
  postFileForChat,
}

export default fileService