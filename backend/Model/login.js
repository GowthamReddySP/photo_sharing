const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { 
    type: String,
    maxLength: 100,
    required: true,
  },

  email: {
    type: String,
    maxLength: 100,
    required: true,
  },

  password: {
    type: String,
    maxLength: 100,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
