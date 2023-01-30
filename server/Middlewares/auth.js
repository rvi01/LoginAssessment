const admin = require("../firebase/");
const User = require("../models/user");

// user auth check
exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      data: "Invalid or Expired token",
    });
  }
};

// Admin auth check
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec()
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource access denied",
    });
  } else {
    next();
  }
};
