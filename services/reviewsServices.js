const { modelReview } = require("../models/review");
const { HttpError } = require("../helpers");

class ReviewsServices {
  show = async (owner, pagination) => {
    const reviews = await modelReview
      .find({ owner }, "-createdAt -updatedAt -__v", pagination)
      .populate("owner", "name avatarUrl");

    if (!reviews) {
      throw HttpError(400, "Unable to fetch Review");
    }

    return reviews;
  };

  showById = async (id) => {
    const reviews = await modelReview
      .findById(id, "-createdAt -updatedAt -__v")
      .populate("owner", "name avatarUrl");
    if (!reviews) {
      throw HttpError(400, "Unable to fetch Review");
    }

    return reviews;
  };

  add = async (owner, data) => {
    console.log("🚀 ~ data:", data);

    const review = await modelReview.create({ ...data, owner });

    if (!review) {
      throw HttpError(400, "Unable to save Review in DataBase");
    }

    // const { createdAt, updatedAt, __v, ...createdReview } = review.toObject();

    return this.showById(review._id);
  };

  change = async (id, data) => {
    const review = await modelReview
      .findByIdAndUpdate(id, data, {
        new: true,
        select: "-createdAt -updatedAt -__v",
      })
      .populate("owner", "name avatarUrl");

    if (!review) {
      throw HttpError(400, "Unable to find Review");
    }

    return review;
  };

  remove = async (id) => {
    const review = await modelReview.findByIdAndDelete(id, {
      select: "-createdAt -updatedAt -__v",
    });

    if (!review) {
      throw HttpError(400, "Unable to find Review");
    }

    return review;
  };
}

const reviewsServices = new ReviewsServices();
module.exports = reviewsServices;
