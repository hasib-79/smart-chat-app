import ImportantUsers from "../models/importantUsers.model.js";

export const setImportantUsers = async (req, res) => {
	try {
		const { groupId } = req.params;
		const { importantUserIds } = req.body;

		let record = await ImportantUsers.findOne({
			userId: req.user._id,
			groupId,
		});

		if (record) {
			record.importantUserIds = importantUserIds;
			await record.save();
		} else {
			record = await ImportantUsers.create({
				userId: req.user._id,
				groupId,
				importantUserIds,
			});
		}

		res.status(200).json(record);

	} catch (error) {
		console.log('Error in setImportantUsers controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getImportantUsers = async (req, res) => {
	try {
		const { groupId } = req.params;

		const record = await ImportantUsers.findOne({
			userId: req.user._id,
			groupId,
		});

		res.status(200).json(record || { importantUserIds: [] });
	} catch (error) {
		console.log('Error in getImportantUsers controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};