const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.downloadImage = async (url, filename, folder) => {
	const response = await axios({
		method: "get",
		url: url,
		responseType: "stream",
	});

	const imagePath = path.join(__dirname, `../public/src/${folder}`, filename);
	const writer = fs.createWriteStream(imagePath);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});
};
