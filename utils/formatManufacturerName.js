module.exports.formatManufacturerName = (name) => {
	const formattedName = name.split(" ").join("-").toLowerCase();

	return formattedName;
};
