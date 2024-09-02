module.exports.validateRegister = (req, res, next) => {
  try {
    const { Username, Email, Password, Role } = req.body;
    if (!Username || !Email || !Password || !Role) {
      return res.status(400).json({
        message:
          "Validation error: email, password, and username are required for registration.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.validateLogin = (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({
        message:
          "Validation error: email, password, and username are required for registration.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
