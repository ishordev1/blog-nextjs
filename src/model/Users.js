const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
