const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  dbID: { type: mongoose.Schema.Types.ObjectId, ref: "ClientContact" },
});

userSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        error: "Error creating password salt",
      });
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          error: "Error hashing password.",
        });
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
