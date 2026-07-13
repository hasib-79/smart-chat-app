import Group from '../models/group.model.js'

export const createGroup = async (req, res) => {
	try {
		const { name, members } = req.body;

		const group = await Group.create({
			name,
			members: [
				...new Set([
					...members,
					req.user._id.toString(),
				]),
			],
			createdBy: req.user._id
		})

		res.status(201).json(group);
	} catch (error) {
		console.log('Error in createGroup controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

export const getUserGroups = async (req, res) => {
	try {
		const groups = await Group.find({
			members: req.user._id
		}).populate("members", "name email");

		res.status(200).json(groups);
	} catch (error) {
		console.log('Error in getUserGroups', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}