const { modelReview } = require("../models/review");
const { HttpError } = require("../helpers");

class ReviewsServices {
  showAll = async (pagination) => {
    // const reviews = await modelReview
    //   .find({}, "-createdAt -updatedAt -__v", pagination)
    // .sort({ _id: -1 })
    //   .populate("owner", "name avatarUrl");

    const reviews = await modelReview.aggregate([
      // Групування за полем "owner"
      { $group: { _id: "$owner", createdAt: { $last: "$$ROOT" } } },
      // Проектування лише поля "lastReview" для кожної групи
      { $replaceRoot: { newRoot: "$createdAt" } },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          createdAt: 1,
          owner: { name: 1, avatarUrl: 1 },
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: pagination.skip },

      { $limit: Number(pagination.limit) },
    ]);

    if (!reviews) {
      throw HttpError(400, "Unable to fetch Review");
    }

    return reviews;
  };

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
