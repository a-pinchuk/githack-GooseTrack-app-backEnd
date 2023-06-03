const expressAsyncHandler = require("express-async-handler");

class ControlerReviews {
  getReviews(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("getReviews");
      const reviews = [];

      res.status(200).json({ code: 200, data: reviews, qty: reviews.length });
    });
  }

  getReviewById(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("getReviewById");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  addReview(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("addReview");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  changeReview(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("changeReview");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  deleteReview(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("deleteReview");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }
}

const controlerReviews = new ControlerReviews();
export default controlerReviews;
