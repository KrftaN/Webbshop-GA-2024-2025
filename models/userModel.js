const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Ogiltigt namn!"] },
	email: {
		type: String,
		required: [true, "Var god och lämna en e-post adress!"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Vad god och lämna en giltig E-post adress!"],
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Var god och sätt ett lösenord!"],
		minLength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Var god och bekräfta ditt lösenord!"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Lösenord matchar inte!",
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	emailConfirmed: {
		type: Boolean,
		default: false,
		select: false,
	},
	emailConfirmationToken: String,
	emailConfimationExpires: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre(/^find/, function (next) {
	// If _includeNonConfirmed is not set, show only confirmed and active users
	if (!this._includeNonConfirmed) {
		this.find({ emailConfirmed: { $ne: false }, active: { $ne: false } });
	}
	next();
});
mongoose.Query.prototype.includeNonConfirmed = function () {
	this._includeNonConfirmed = true;
	return this;
};

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
		return JWTTimestamp < changedTimestamp;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
