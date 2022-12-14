/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import _ from "lodash";
import User from "../models/user.model.js";
import dbErrorHandler from "./helpers/dbErrorHandler.js";
import config from "../config/config.js";

const createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      res.send({ error: dbErrorHandler.getErrorMessage(err) });
    } else {
      res.send({ message: "Successfuly created a new user." });
    }
  });
};

const read = (req, res) => {
  User.findOne({ _id: req.profile.id }, (err, user) => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        status: user.status,
        role: user.role,
      },
      config.secret
    );

    return res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        userImage: user.userImage,
      },
      message: "User found!",
    });
  });
};

const update = async (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);

  await User.findOneAndUpdate({ _id: req.profile._id }, { ...user }).exec();

  return res.send({
    message: "Data updated",
    data: user,
    token: req.cookies.userJwtToken,
  });
};

const remove = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile.id },
    { status: "deactivated" }
  ).exec((err, user) => {
    if (user) {
      return res.send({ message: "Profile deleted" });
    } else {
      return res.send({ error: dbErrorHandler.getErrorMessage(err) });
    }
  });
};

const getUsers = (req, res) => {
  User.find({}, (error, user) => {
    console.log("test");
    console.log(user);
    if (!error) {
      return res.send({
        data: user,
      });
    } else {
      console.log(error);
    }
  });
};
const assignUserRole = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.profile.id }, { role: req.body.role }).exec(
    (err, user) => {
      if (user) {
        return res.send({ message: "User role was updated" });
      } else {
        return res.send({ error: dbErrorHandler.getErrorMessage(err) });
      }
    }
  );
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};

export default {
  createUser,
  read,
  update,
  remove,
  getUsers,
  assignUserRole,
  userByID,
};
