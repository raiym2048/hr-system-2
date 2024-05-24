import axios from 'axios'
import { baseUrl } from './commonVariables'
import { authorizationHeader } from './commonVariables'

const getUnreadMessagesCount = async () => {
  const response = await axios.get(`${baseUrl}/chat/allMyUnReadMessagesCount`, authorizationHeader)
  return response.data
}

const getChatHistory = async () => {
  const response = await axios.get(`${baseUrl}/chat/getAllHistoryChat`, authorizationHeader)
  return response.data
}

const getSinglePartner = async (userId: number) => {
  const response = await axios.get(`${baseUrl}/chat/openUser/${userId}`, authorizationHeader)
  return response.data
}

const postStatusUpdate = async (email: string) => {
  const response = await axios.post(
    `${baseUrl}/chat/connectToUser?email=${email}`,
    {},
    authorizationHeader
  )
  return response.data
}

const chatService = {
  getUnreadMessagesCount,
  getChatHistory,
  postStatusUpdate,
  getSinglePartner,
}

export default chatService
