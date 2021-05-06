const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  dbID: { type: mongoose.Schema.Types.ObjectId, ref: "ClientContact" },
});

// Method to compare a user entered password with the saved password on login
userSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Method to salt and hash a password before saving to the database
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
