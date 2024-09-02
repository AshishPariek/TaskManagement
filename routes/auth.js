const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const {
  validateLogin,
  validateRegister,
} = require("../middleware/validationMiddleware");

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

module.exports = router;
