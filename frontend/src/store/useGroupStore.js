import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';

export const useGroupStore = create((set, get) => ({
	groups: [],
	selectedGroup: null,
	unreadCounts: {},

	isGroupsLoading: false,

	getGroups: async () => {
		set({ isGroupsLoading: true });
		try {
			const res = await axiosInstance.get(`/groups`);

			set({ groups: res.data });

			if (res.data.length > 0) {
				set({ selectedGroup: res.data[0] });
			}
		} catch (error) {
			console.log('Error in getGroups', error);
		} finally {
			set({ isGroupsLoading: false });
		}
	},

	setSelectedGroup: (group) => {

		set((state) => ({
			selectedGroup: group,

			unreadCounts: {
				...state.unreadCounts,
				[group._id]: 0
			}
		}));
	},

	incrementUnread: (groupId) => {
		const selectedGroup = get().selectedGroup;

		if (selectedGroup?._id === groupId) {
			return;
		}

		set((state) => ({
			unreadCounts: {
				...state.unreadCounts,

				[groupId]:
					(state.unreadCounts[groupId] || 0) + 1,
			},
		}));
	},

	createGroup: async (data) => {
		try {
			const res = await axiosInstance.post('/groups', data);

			set((state) => ({
				groups: [...state.groups, res.data]
			}));
		} catch (error) {
			console.log('Error in createGroup', error);
		}
	}
}))