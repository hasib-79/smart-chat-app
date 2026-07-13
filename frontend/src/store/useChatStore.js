import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { socket } from '../lib/socket'
import { useGroupStore } from './useGroupStore'
import { toast } from 'react-hot-toast'

export const useChatStore = create((set, get) => ({
	messages: [],
	importantUserIds: [],
	filter: "all",
	summary: "",

	isSummarizing: false,

	setFilter: (filter) => set({ filter }),

	getMessages: async (groupId) => {
		try {
			const res = await axiosInstance.get(`/messages/${groupId}`);

			set({ messages: res.data });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to get messages");
		}
	},

	sendMessage: async (groupId, text) => {
		try {
			const res = await axiosInstance.post(`/messages/${groupId}`, { text });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to send message");
		}
	},

	getImportantUsers: async (groupId) => {
		try {
			const res = await axiosInstance.get(`/important-users/${groupId}`);

			set({ importantUserIds: res.data.importantUserIds || [] });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to get important users");
		}
	},

	subscribeToMessages: (groupId) => {
		socket.off('newMessage');

		socket.emit('joinGroup', groupId);

		socket.on('newMessage', (msg) => {
			if (msg.groupId == groupId) {
				set({ messages: [...get().messages, msg] });
			}

			useGroupStore.getState().incrementUnread(msg.groupId);
		})
	},

	updateImportantUsers: async (groupId, importantUserIds) => {
		try {
			const res = await axiosInstance.post(`/important-users/${groupId}`, { importantUserIds });

			set({ importantUserIds: res.data.importantUserIds });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update important users");
		}
	},

	unsubscribeToMessages: () => {
		socket.off("newMessage");
	},

	summarizeMessages: async (groupId) => {
		set({ isSummarizing: true });
		try {
			const res = await axiosInstance.post(`/summary/${groupId}`);

			set({ summary: res.data.summary });
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to summarize messages");
		} finally {
			set({ isSummarizing: false });
		}
	}
}))