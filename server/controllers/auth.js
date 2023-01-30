const User = require("../models/user");

// for new user
exports.createOrUpdateUser = async (req, res) => {
  const { name, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], email },
    { new: true }
  );

  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
    }).save();
    res.json(newUser);
  }
};

// for new user
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
