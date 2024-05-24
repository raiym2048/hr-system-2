import registerService from './registration'

// export const baseUrl = 'https://hr-back.fly.dev'
export const baseUrl = 'http://localhost:8083'
// export const baseUrl = 'http://192.168.31.83:8083'
// export const baseUrl = 'http://localhost:3000'

// export const socketUrl = 'http://192.168.31.86:8080'
export const socketUrl = 'ws://localhost:8083/ws'
// export const socketUrl = 'ws://192.168.31.85:8083/ws'

export const authorizationHeader = {
  headers: { Authorization: registerService.user.token },
}


