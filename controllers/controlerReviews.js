const expressAsyncHandler = require("express-async-handler");

const { reviewsServices } = require("../services");

class ControlerReviews {
  getAllReviews = expressAsyncHandler(async (req, res) => {
    const { page = 1, limit = 2 } = req.query;

    const skip = (page - 1) * limit;

    const reviews = await reviewsServices.showAll({ skip, limit });

    res.status(200).json({ code: 200, data: reviews });
  });

  getReviews = expressAsyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 2 } = req.query;

    const skip = (page - 1) * limit;

    const reviews = await reviewsServices.show(owner, { skip, limit });

    res.status(200).json({ code: 200, data: reviews });
  });

  getReviewById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewsServices.showById(id);
    res.status(200).json({ code: 200, data: review });
  });

  addReview = expressAsyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const review = await reviewsServices.add(owner, { ...req.body });

    res.status(201).json({ code: 201, data: review });
  });

  changeReview = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewsServices.change(id, { ...req.body });

    res.status(200).json({ code: 200, data: review });
  });

  deleteReview = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewsServices.remove(id);

    res.status(200).json({ code: 200, data: review });
  });
}

const controlerReviews = new ControlerReviews();
module.exports = controlerReviews;
