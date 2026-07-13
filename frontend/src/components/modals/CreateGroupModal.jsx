import {
	useEffect,
	useState,
} from "react";

import { useUserStore } from "../../store/useUserStore";
import { useGroupStore } from "../../store/useGroupStore";

function CreateGroupModal({
	isOpen,
	onClose,
}) {
	const [name, setName] =
		useState("");

	const [selectedUsers, setSelectedUsers] =
		useState([]);

	const {
		users,
		getUsers,
	} = useUserStore();

	const {
		createGroup,
	} = useGroupStore();

	useEffect(() => {
		if (isOpen) {
			getUsers();
		}
	}, [isOpen]);

	const toggleUser = (userId) => {
		if (
			selectedUsers.includes(userId)
		) {
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

	const handleCreate = async () => {
		if (!name.trim()) return;

		await createGroup({
			name,
			members: selectedUsers,
		});

		setName("");
		setSelectedUsers([]);

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
			<div className="bg-white w-full max-w-lg mx-4 rounded-xl p-6">

				<h2 className="text-2xl font-bold mb-5">
					Create Group
				</h2>

				<input
					type="text"
					placeholder="Group name"
					value={name}
					onChange={(e) =>
						setName(
							e.target.value
						)
					}
					className="w-full border rounded-lg px-4 py-3 mb-5"
				/>

				<div className="max-h-64 overflow-y-auto space-y-2">

					{users.map(
						(user) => (
							<div
								key={
									user._id
								}
								className="flex items-center justify-between border rounded-lg p-3"
							>
								<div>
									<h4 className="font-medium">
										{
											user.name
										}
									</h4>

									<p className="text-sm text-gray-500">
										{
											user.email
										}
									</p>
								</div>

								<input
									type="checkbox"
									checked={selectedUsers.includes(
										user._id
									)}
									onChange={() =>
										toggleUser(
											user._id
										)
									}
								/>
							</div>
						)
					)}
				</div>

				<div className="flex justify-end gap-3 mt-6">
					<button
						onClick={onClose}
						className="border px-4 py-2 rounded-lg cursor-pointer"
					>
						Cancel
					</button>

					<button
						onClick={handleCreate}
						className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
					>
						Create
					</button>
				</div>

			</div>
		</div>
	);
}

export default CreateGroupModal;