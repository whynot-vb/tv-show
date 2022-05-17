import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    minLength: [3, "Username must have at least 3 characters"],
    maxLength: [20, "Username must have at most 20 characters"],
    required: [true, "Please provide a username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password must be at least 6 characters"],
    // select: false,
  },
  favoriteShows: {
    type: [Number],
    default: [],
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", userSchema);
