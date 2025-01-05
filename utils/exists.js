const fs = require("fs").promises;

const exists = async (filePath) => {
	try {
		await fs.access(filePath);
		return true;
	} catch (err) {
		if (err.code === "ENOENT") {
			return false;
		} else {
			console.error("Error checking file existence:", err);
			throw err; // Propagate the error if it's not ENOENT
		}
	}
};

module.exports = exists;
