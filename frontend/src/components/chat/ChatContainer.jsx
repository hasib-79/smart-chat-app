import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useGroupStore } from '../../store/useGroupStore'

const ChatContainer = () => {
	const { selectedGroup } = useGroupStore();

	if (!selectedGroup) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<h2 className="text-2xl text-gray-500">
					No groups found
				</h2>
			</div>
		)
	}
	return (
		<div className="flex-1 flex flex-col min-h-0">
			<ChatHeader />

			<MessageList />

			<MessageInput />
		</div>
	)
}

export default ChatContainer
