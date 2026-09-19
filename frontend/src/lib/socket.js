import { io } from 'socket.io-client'

const apiUrl = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : `${import.meta.env.VITE_API_URL}/api`

export const socket = io(apiUrl, {
	withCredentials: true
})