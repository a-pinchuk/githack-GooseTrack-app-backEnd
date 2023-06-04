const expressAsyncHandler = require("express-async-handler");

const { reviewsServices } = require("../services");

class ControlerReviews {
  getReviews = expressAsyncHandler(async (req, res) => {
    const { _id: owner } = req.user;

    const reviews = await reviewsServices.show(owner);

    res.status(200).json({ code: 200, data: reviews, count: reviews.length });
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
