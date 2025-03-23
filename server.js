const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const clc = require("cli-color");
dotenv.config({ path: "./config.env" });

console.log(`Currently in ${clc.yellow(`${process.env.NODE_ENV}`)} mode`);

process.on("uncaughtException", (error) => {
	console.log("UNCAUGHT EXCEPTION! Closing server...\n", error.stack);
	process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => {
	console.log(`Connected to ${clc.green("MongoDB")}!`);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`listening on port ${clc.blue(`${port}`)}`);
});

process.on("unhandledRejection", (error) => {
	console.log("UNHANDLED REJECTION! Closing server...\n", error.stack);
	server.close(() => {
		console.log("Successfully closed server...");
		process.exit(1);
	});
});
