import Message from "../models/message.model.js"
import { GoogleGenAI } from "@google/genai"
import 'dotenv/config'

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
})

export const summarizeMessages = async (req, res) => {
	try {
		const { groupId } = req.params;

		const messages = await Message.find({ groupId })
			.populate('senderId', 'name')
			.sort({ createdAt: -1 })
			.limit(20);

		if (messages.length < 20) {
			return res.status(400).json({ message: 'Not enough messages to summarize' });
		}

		const orderedMessages = messages.reverse();
		const chatText = orderedMessages.map((msg) => `${msg.senderId.name}: ${msg.text}`).join("\n");

		const prompt = `
							Summarize these group chats into short important bullet points.
							Ignore casual conversation.

							Group chats:
							${chatText}
						`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt
		})

		const summary = response.text;

		res.status(200).json({ summary });
	} catch (error) {
		console.log('Error in summarizeMessages controller', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}