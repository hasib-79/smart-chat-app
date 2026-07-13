import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isCheckingAuth: true,

	signup: async (data) => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post(`/auth/signup`, data);

			set({ authUser: res.data });

			toast.success("Account creatred");
		} catch (error) {
			set({ authUser: null });
			toast.error(error.response?.data?.message || "Failed to signup");
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true })
		try {
			const res = await axiosInstance.post('/auth/login', data);

			set({ authUser: res.data });

			toast.success("Looged in successfully");
		} catch (error) {
			set({ authUser: null });
			toast.error(error.response?.data?.message || "Failed to login");
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.get('/auth/logout');

			set({ authUser: null });

			toast.success('Logged out successfully');
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to logout");
		}
	},

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get('/auth/check');

			set({ authUser: res.data });
		} catch (error) {
			set({ authUser: null });
			console.log('Error in checkAuth', error);
		} finally {
			set({ isCheckingAuth: false });
		}
	}
}))