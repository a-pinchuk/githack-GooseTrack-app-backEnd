const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const reviewSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Set owner contact"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  description: {
    type: String,
    maxLength: 1000,
    required: [true, "DB: Description is required"],
  },
});

reviewSchema.post("save", handleMongooseError);

// * JOI
const schemaAddReview = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  description: Joi.string().max(1000).required(),
});

const schemas = {
  schemaAddReview,
};

const modelReview = model("review", reviewSchema);

module.exports = {
  modelReview,
  schemas,
};
