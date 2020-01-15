const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/Users");
const initPassport = require("./passport.config.js");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const menu = {
	main: "Main Page",
	login: "login",
	register: "register"
};

//middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
initPassport(passport, email => {
	return;
});
// main page
app.get("/", async (req, res) => {
	const users = await User.find({});
	res.render("index", { menu, users });
});

// login
app.get("/login", (req, res) => {
	res.render("login", menu);
});

// register
app.get("/register", (req, res) => {
	res.render("register", menu);
});

app.post("/register", async (req, res) => {
	try {
		const hashedPass = await bcrypt.hash(req.body.pass, 10);
		const user = await new User({
			name: req.body.name,
			password: hashedPass,
			email: req.body.email
		});
		await user.save();
		res.redirect("/login");
	} catch (error) {
		console.log(error);
	}
});

async function start() {
	try {
		await mongoose.connect("mongodb://localhost/site", {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		app.listen(3000, () => {
			console.log("Server lounched!");
		});
	} catch (error) {
		console.log(error);
	}
}

start();
