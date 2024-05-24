import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatService from '../../services/chatService'

export const getUnreadMessagesCount = createAsyncThunk(
  'chatInformation/getUnreadMessagesCount',
  async (_, { rejectWithValue }) => {
    try {
      const result = chatService.getUnreadMessagesCount()
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const getChatHistory = createAsyncThunk(
  'chatInformation/getChatHistory',
  async (_, { rejectWithValue }) => {
    try {
      const result = chatService.getChatHistory()
      return result
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const postStatusUpdate = createAsyncThunk(
  'chatInformation/postStatusUpdate',
  async (obj: { email: string; id: number }, { rejectWithValue }) => {
    try {
      chatService.postStatusUpdate(obj.email)
      return obj
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

type TMessage = {
  amIAuthor: boolean
  sender: string
  recipient: string
  read: boolean
  id: number
  content: string
  sentTime: string
  fileResponse: string | undefined
}
export type TInterlocutor = {
  userId: number
  companyName: string | null
  firstname: string | null
  lastname: string | null
  position: string | null
  messageResponses: TMessage[]
  fileResponse: string | undefined
  unreadCount: number
}

type TInitialState = {
  unreadMessagesCount: number
  allChatMessages: [] | TInterlocutor[]
  status: string | null
}
const initialState: TInitialState = {
  unreadMessagesCount: 0,
  allChatMessages: [],
  status: null,
}
const chatSlice = createSlice({
  name: 'chatInformation',
  initialState,
  reducers: {
    appendAMessage: (state, action) => {
      let counter = 0
      state.allChatMessages.map((item) => {
        if (item.userId === action.payload.responseEntity.userId) {
          counter++
          const result = item.messageResponses.unshift(
            action.payload.responseEntity.messageResponses[0]
          )
          return result
        }
        return item
      })
      if (counter === 0) {
        state.allChatMessages = [action.payload.responseEntity, ...state.allChatMessages]
      }
    },
    updateStatus: (state, action) => {
      state.allChatMessages.map((item) => {
        if (item.userId === action.payload.responseEntity.partnerId) {
          item.messageResponses.forEach(response => response.read = true)
        }
        return item
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUnreadMessagesCount.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getUnreadMessagesCount.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.unreadMessagesCount = action.payload
      })
      .addCase(getUnreadMessagesCount.rejected, (state) => {
        state.status = 'rejected'
      })

      .addCase(getChatHistory.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.allChatMessages = action.payload
      })
      .addCase(getChatHistory.rejected, (state) => {
        state.status = 'rejected'
      })

      .addCase(postStatusUpdate.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(postStatusUpdate.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.allChatMessages.map((item) => { 
          if (item.userId !== action.payload.id) return item
          state.unreadMessagesCount -= item.unreadCount
          item.unreadCount = 0
        })
      })
      .addCase(postStatusUpdate.rejected, (state) => {
        state.status = 'rejected'
      })
  },
})

export const { appendAMessage, updateStatus } = chatSlice.actions
export default chatSlice
