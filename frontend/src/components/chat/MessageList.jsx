import { useEffect, useRef } from "react";
import { useChatStore } from '../../store/useChatStore'
import { useGroupStore } from '../../store/useGroupStore'
import { useAuthStore } from "../../store/useAuthStore";

const MessageList = () => {
	const buttomRef = useRef();

	const { authUser } = useAuthStore();

	const { selectedGroup } = useGroupStore();

	const {
		messages,
		importantUserIds,
		filter,
		getMessages,
		subscribeToMessages,
		unsubscribeToMessages
	} = useChatStore();

	const filteredMessages =
		filter === 'important'
			? messages.filter((msg) => importantUserIds.includes(msg.senderId._id))
			: messages

	useEffect(() => {
		if (!selectedGroup) return;

		getMessages(selectedGroup._id);

		subscribeToMessages(selectedGroup._id);

		return () => unsubscribeToMessages();
	}, [selectedGroup])

	useEffect(() => {
		buttomRef.current?.scrollIntoView({
			behavior: "smooth",
		})
	}, [messages])


	return (
		<div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
			{filteredMessages.length === 0 && (
				<div className="h-full flex items-center justify-center">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-gray-700">
							No messages yet
						</h3>

						<p className="text-gray-500 mt-2">
							Start the conversation
						</p>
					</div>
				</div>
			)}

			{filteredMessages.map((msg) => (
				<div
					key={msg._id}
					className={`flex ${msg.senderId._id === authUser._id
							? "justify-end"
							: "justify-start"
						}`}
				>
					<div
						className={`max-w-[70%] p-4 rounded-2xl ${msg.senderId._id === authUser._id
								? "bg-black text-white"
								: "bg-white"
							}`}
					>
						<h4 className="font-semibold mb-1">
							{msg.senderId.name}
						</h4>

						<p>{msg.text}</p>

						<p
							className={`text-xs mt-2 ${msg.senderId._id === authUser._id
									? "text-gray-300"
									: "text-gray-500"
								}`}
						>
							{new Date(
								msg.createdAt
							).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>
				</div>
			))}

			<div ref={buttomRef}></div>
		</div>
	)
}

export default MessageList
