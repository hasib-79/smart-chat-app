import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.routes.js'
import groupRoutes from './routes/group.routes.js'
import messageRoutes from './routes/message.routes.js'
import importantUsersRoutes from './routes/importantUsers.routes.js'
import summaryRoutes from './routes/summary.routes.js'
import userRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))

export const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
		credentials: true
	}
})

io.on('connection', (socket) => {
	console.log('User connected:', socket.id);

	socket.on('joinGroup', (groupId) => {
		socket.join(groupId);
	})

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	})
})

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/important-users', importantUsersRoutes);
app.use('/api/summary', summaryRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
})
