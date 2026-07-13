import { useState } from "react";

import { useChatStore } from "../../store/useChatStore";
import { useGroupStore } from "../../store/useGroupStore";

function ImportantUsersModal({
	isOpen,
	onClose,
}) {
	const { selectedGroup } = useGroupStore();

	const {
		importantUserIds,
		updateImportantUsers,
	} = useChatStore();

	const [selectedUsers, setSelectedUsers] =
		useState(importantUserIds);

	const toggleUser = (userId) => {
		if (selectedUsers.includes(userId)) {
			setSelectedUsers(
				selectedUsers.filter(
					(id) => id !== userId
				)
			);
		} else {
			setSelectedUsers([
				...selectedUsers,
				userId,
			]);
		}
	};

	const handleSave = async () => {
		await updateImportantUsers(
			selectedGroup._id,
			selectedUsers
		);

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
			<div className="bg-white w-full max-w-md rounded-xl p-6">
				<h2 className="text-2xl font-bold mb-5">
					Important Members
				</h2>

				<div className="space-y-3 max-h-80 overflow-y-auto">
					{selectedGroup.members.map((member) => (
						<div
							key={member._id}
							className="flex items-center justify-between border rounded-lg p-3"
						>
							<div>
								<h3 className="font-medium">
									{member.name}
								</h3>

								<p className="text-sm text-gray-500">
									{member.email}
								</p>
							</div>

							<input
								type="checkbox"
								checked={selectedUsers.includes(
									member._id
								)}
								onChange={() =>
									toggleUser(member._id)
								}
							/>
						</div>
					))}
				</div>

				<div className="flex justify-end gap-3 mt-6">
					<button
						onClick={onClose}
						className="border px-4 py-2 rounded-lg"
					>
						Cancel
					</button>

					<button
						onClick={handleSave}
						className="bg-black text-white px-4 py-2 rounded-lg"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImportantUsersModal;