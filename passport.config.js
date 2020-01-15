const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");

function init(passport) {
	const authUser = async (email, password, done) => {
		const user = getUserByEmail(email);
		if (user == null) {
			return done(null, false, { message: "no user with that email" });
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: "password incorrect" });
			}
		} catch (e) {
			return done(e);
		}
	};
	passport.use(new localStrategy({ usernameField: "email" }), authUser);
	passport.serialiyeUser((user, done) => {});
	passport.deserialiyeUser((id, done) => {});
}
module.exports = init;
