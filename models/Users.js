const { Schema, model } = require("mongoose");

const User = new Schema({
	name: {
		type: String
	},
	email: String,
	password: String
});

module.exports = model("user", User);
