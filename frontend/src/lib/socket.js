import { io } from 'socket.io-client'

const apiUrl = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : `${import.meta.env.VITE_API_URL}`

export const socket = io(apiUrl, {
	withCredentials: true
})