import mongoose from "mongoose";
import crypto from "crypto";
import validate from "mongoose-validator";

const ArticleSchema = new mongoose.Schema({
  Author: {
    type: String,
    required: "First name is required",
    trim: true,
    maxlength: [30, "First name must be less than 15 characters"],
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Special characters are not allowed in first name",
    ],
  },
  Article: {
    type: String,
    required: "Last name is required",
    trim: true,
    maxlength: [30, "Last name must be less than 20 characters"],
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Special characters are not allowed in last name",
    ],
  },
  PublishYear: {
    type: String,
    unique: "Email already exists.",

    required: "Email is required",
  },
  myThoughts: {
    type: String,
    unique: "Email already exists.",

    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  userImage: {
    type: String,
    default: "",
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  role: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  salt: String,
});

ArticleSchema.virtual("password").set(function (password) {
  (this._password = password),
    (this.salt = this.makeSalt()),
    (this.hashed_password = this.encryptPassword(password));
});

ArticleSchema.methods = {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
  makeSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`;
  },
};

ArticleSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters");
  }
}, null);

export default mongoose.model("Article", ArticleSchema);
