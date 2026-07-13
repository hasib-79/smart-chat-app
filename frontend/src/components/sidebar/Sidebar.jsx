import { useEffect, useState } from "react"
import { useGroupStore } from '../../store/useGroupStore'
import CreateGroupModal from "../modals/CreateGroupModal"

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const [isCreateOpen, setisCreateOpen] = useState(false);

	const {
		groups,
		selectedGroup,
		setSelectedGroup,
		getGroups,
		unreadCounts
	} = useGroupStore();

	useEffect(() => {
		getGroups();
	}, [])



	return (
		<>
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/40 z-40 md:hidden"
					onClick={() =>
						setIsSidebarOpen(false)
					}
				/>
			)}

			<div
				className={`
			fixed md:static
			top-0 left-0
			h-full
			w-80
			bg-white
			border-r
			flex flex-col
			z-50
			transform
			transition-transform
			duration-300
			${isSidebarOpen
						? "translate-x-0"
						: "-translate-x-full md:translate-x-0"
					}
			`}
			>

				<div className="flex items-center justify-between p-5 border-b md:hidden">
					<h1 className="text-2xl font-bold">
						Smart Chat
					</h1>

					<button
						onClick={() =>
							setIsSidebarOpen(false)
						}
						className="text-2xl"
					>
						✕
					</button>
				</div>

				{/* Header */}
				<div className={`p-5 border-b hidden md:block`}>
					<h1 className="text-2xl font-bold">
						Smart Chat
					</h1>
				</div>

				{/* Groups */}
				<div className="flex-1 overflow-y-auto p-3 space-y-2">
					{groups.map((group) => (
						<div
							key={group._id}
							onClick={() => {
								setIsSidebarOpen(false)
								setSelectedGroup(group)
							}}
							className={`rounded-lg p-3 cursor-pointer transition ${selectedGroup?._id === group._id
								? "bg-black text-white"
								: "bg-gray-100"
								}`}
						>
							<h3 className="font-medium">{group.name}</h3>

							<div className="flex items-center justify-between mt-1">
								<p
									className={`text-sm ${selectedGroup?._id === group._id
										? "text-gray-300"
										: "text-gray-500"
										}`}
								>
									{group.members.length} members
								</p>

								{unreadCounts[group._id] > 0 && (
									<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
										{unreadCounts[group._id]}
									</span>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="p-4 border-t">
					<button
						onClick={() => setisCreateOpen(true)}
						className="w-full bg-black text-white py-3 rounded-lg cursor-pointer">
						+ Create Group
					</button>
				</div>

				<CreateGroupModal
					isOpen={isCreateOpen}
					onClose={() => setisCreateOpen(false)}
				/>
			</div>
		</>
	)
}

export default Sidebar
