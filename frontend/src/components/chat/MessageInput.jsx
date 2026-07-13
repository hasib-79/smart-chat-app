import { useState } from "react"
import { useChatStore } from "../../store/useChatStore"
import { useGroupStore } from "../../store/useGroupStore"

const MessageInput = () => {
	const [text, settext] = useState('');

	const { selectedGroup } = useGroupStore();

	const { sendMessage } = useChatStore();

	const handleSend = async () => {
		if (!text.trim()) return;

		await sendMessage(selectedGroup._id, text);

		settext("");

	}

	return (
		<div className="p-4 bg-white border-t flex gap-3">
			<input
				type="text"
				placeholder="Type a message..."
				className="flex-1 border rounded-lg px-4 py-3 outline-none"
				value={text}
				onChange={e => settext(e.target.value)}
			/>

			<button
				onClick={handleSend}
				className="bg-black text-white px-6 rounded-lg cursor-pointer"
			>
				Send
			</button>
		</div>
	)
}

export default MessageInput
