import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
	try {
		const users = await User.find(
			{ _id: { $ne: req.user._id } },
			"name email"
		);

		res.status(200).json(users);
	} catch (error) {
		console.log('Error in getUsers controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}