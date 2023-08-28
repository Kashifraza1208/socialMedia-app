const express = require("express");

const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticatedUser, followUser);
router.route("/update/password").put(isAuthenticatedUser, updatePassword);
router.route("/update/profile").put(isAuthenticatedUser, updateProfile);
router.route("/delete/me").delete(isAuthenticatedUser, deleteMyProfile);
router.route("/me").get(isAuthenticatedUser, myProfile);
router.route("/my/posts").get(isAuthenticatedUser, getMyPosts);
router.route("/userposts/:id").get(isAuthenticatedUser, getUserPosts);
router.route("/user/:id").get(isAuthenticatedUser, getUserProfile);
router.route("/users").get(isAuthenticatedUser, getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
