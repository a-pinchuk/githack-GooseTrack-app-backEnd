const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dateRegexp =
  /^(?:(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20)\d\d)?$/;
const phoneRegexp = /^38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [false, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    skype: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).optional(),
  skype: Joi.string().optional(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().pattern(dateRegexp).optional(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
