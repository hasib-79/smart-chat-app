import { useEffect } from "react"
import { useGroupStore } from "../../store/useGroupStore"
import { useChatStore } from "../../store/useChatStore"

const SummaryModal = ({ isOpen, onClose }) => {
	const { selectedGroup } = useGroupStore();

	const {
		summary,
		summarizeMessages,
		isSummarizing
	} = useChatStore();

	useEffect(() => {
		if (isOpen && selectedGroup) {
			summarizeMessages(selectedGroup._id);
		}
	}, [isOpen])

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-lg rounded-xl p-6">
				<div className="flex items-center justify-between mb-5">
					<h2 className="text-2xl font-bold">
						AI Summary
					</h2>

					<button
						onClick={onClose}
						className="text-gray-500 cursor-pointer"
					>
						X
					</button>
				</div>

				{isSummarizing ? (
					<div className="py-10 text-center">
						Summarizing...
					</div>
				) : (
					<div className="text-gray-700 whitespace-pre-wrap leading-7">
						{summary}
					</div>
				)}
			</div>
		</div>
	)
}

export default SummaryModal
