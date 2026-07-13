import { useEffect, useState } from "react";
import { useGroupStore } from "../../store/useGroupStore"
import { useChatStore } from "../../store/useChatStore"
import ImportantUserModal from '../modals/ImportantUserModal'
import SummaryModal from "../modals/SummaryModal"

const ChatHeader = () => {
	const { selectedGroup, unreadCounts } = useGroupStore();

	const {
		filter,
		setFilter,
		getImportantUsers,
		messages,
	} = useChatStore();

	const [isModalOpen, setisModalOpen] = useState(false);
	const [isSummaryOpen, setisSummaryOpen] = useState(false);

	useEffect(() => {
		if (selectedGroup) {
			getImportantUsers(selectedGroup._id);
		}
	}, [selectedGroup])


	if (!selectedGroup) {
		return (
			<div className="h-20 bg-white border-b flex items-center justify-center">
				Select a group
			</div>
		)
	}

	return (
		<>
			<div className="h-20 bg-white border-b px-6 flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">
						{selectedGroup.name}
					</h2>

					<p className="text-sm text-gray-500">
						{selectedGroup.members.length} members
					</p>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => setFilter('all')}
						className={`border px-4 py-2 rounded-lg cursor-pointer ${filter === "all"
							? "bg-black text-white"
							: ""
							}`}>
						All
					</button>

					<button
						onClick={() => setFilter("important")}
						className={`border px-4 py-2 rounded-lg cursor-pointer ${filter === "important"
							? "bg-black text-white"
							: ""
							}`}>
						⭐ Important
					</button>

					<button
						onClick={() => setisModalOpen(true)}
						className="border px-4 py-2 rounded-lg cursor-pointer"
					>
						Manage Important
					</button>

					{messages.length > 20 && (
						<button
							onClick={() => setisSummaryOpen(true)}
							className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
						>
							Summarize
						</button>
					)}
				</div>
			</div>

			<ImportantUserModal
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			/>

			<SummaryModal
				isOpen={isSummaryOpen}
				onClose={() => setisSummaryOpen(false)}
			/>
		</>
	)
}

export default ChatHeader
