import Message from '../models/message.model.js'
import { io } from '../server.js';

export const sendMessage = async (req, res) => {
	try {
		const { text } = req.body;
		const { groupId } = req.params;

		const message = await Message.create({
			groupId,
			senderId: req.user._id,
			text
		})

		const populatedMessage = await message.populate('senderId', 'name email');

		io.to(groupId).emit('newMessage', populatedMessage);

		res.status(201).json(populatedMessage);
	} catch (error) {
		console.log('Error in sendMessage controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

export const getMessages = async (req, res) => {
	try {
		const { groupId } = req.params;

		const messages = await Message.find({ groupId })
			.populate('senderId', 'name email')
			.sort({ createdAt: 1 })

		res.status(200).json(messages);
	} catch (error) {
		console.log('Error in getMessages controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}