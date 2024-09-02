const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const RefreshToken = require("../models/refreshtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  const { Username, Email, Password, Role } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log(hashedPassword);

    const user = await User.create({
      Username,
      Email,
      Password: hashedPassword,
      Role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", UserId: user.UserId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { UserId: user.UserId, Role: user.Role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = await RefreshToken.create({
      Token: token,
      ExpiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // ONE HOUR
      UserId: user.UserId,
    });

    res.status(200).json({ token, refreshToken: refreshToken.Token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
