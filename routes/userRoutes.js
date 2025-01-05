const express = require("express");
const router = express.Router();

//🥵 🥵 🥵 🥵  jag älskar detta 🥵 🥵 🥵 🥵
const { getAllUsers } = require("../controllers/users/getAllUsers");
const { updateCurrentUser } = require("../controllers/users/updateCurrentUser");
const { deleteCurrentUser } = require("../controllers/users/deleteCurrentUser");

const { signup } = require("../controllers/authentication/signup");
const { login } = require("../controllers/authentication/login");
const { logout } = require("../controllers/authentication/logout");
const { protect } = require("../controllers/authentication/protect");
const { permission } = require("../controllers/authentication/permission");
const { forgotPassword } = require("../controllers/authentication/forgotPassword");
const { resetPassword } = require("../controllers/authentication/resetPassword");
const { updatePassword } = require("../controllers/authentication/updatePassword");
const { confirmEmail } = require("../controllers/authentication/confirmEmail");

//Middleware
router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);

router.patch("/confirmEmail/:token", confirmEmail);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);
router.patch("/updateCurrentUser", protect, updateCurrentUser);
router.delete("/deleteCurrentUser", protect, deleteCurrentUser);

router.route("/").get(protect, permission("admin"), getAllUsers);

module.exports = router;
