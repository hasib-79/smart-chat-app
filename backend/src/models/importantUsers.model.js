import mongoose, { mongo } from "mongoose";

const importantUsersSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		groupId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
			required: true
		},
		importantUserIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{ timestamps: true }
)

const importantUsers = mongoose.model('ImportantUsers', importantUsersSchema);

export default importantUsers;