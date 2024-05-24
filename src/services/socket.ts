import { Action, Dispatch } from '@reduxjs/toolkit'
import { socketUrl } from './commonVariables'
import registerService from './registration'
import { appendAMessage, updateStatus } from '../redux/slice/chatSlice'
import { useEffect } from 'react'

export const socket = new WebSocket(`${socketUrl}?Authorization=${registerService.user.token}`)

export const initSocket = (dispatch: Dispatch<Action>) => {
  console.log('Connecting to Websocket...')
  socket.onopen = () => {
    // TODO: set user online status 'true'
    console.log('Connected to Websocket!')
  }
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data)
    if (response.type === 'newMessage' || response.type === 'messageConfirm') {
      dispatch(appendAMessage(response))
    }
    if (response.type === 'statusUpdate') {
      dispatch(updateStatus(response))
    }
    console.log('Onmessage event fired', event.data)
  }
  socket.onclose = (event) => {
    console.log('Websocket is closing', event)
  }
  socket.onerror = (event) => {
    console.error('An error ocured', event)
    socket.close()
  }
}

const useSocket = () => {
  console.log('usesocket')
  useEffect(() => {
    console.log('Trying to connect to Websocket')
    socket.onopen = () => {
      // set user online status 'true'
      console.log('Connected to Websocket')
      // socket.send(JSON.stringify(initialMessage))
      // console.log('sent initial message')
    }

    socket.onmessage = (event) => {
      console.log('Onmessage event fired', event.data)
    }

    socket.onclose = (event) => {
      console.log('Websocket is closing', event)
    }

    socket.onerror = (event) => {
      console.error('An error ocured', event)
      // if (event instanceof ErrorEvent) {
      //   console.error(event.message)
      // }
      socket.close()
    }

    // return () => {
    //   socket.close()
    // }
  }, [])
}

export default useSocket
