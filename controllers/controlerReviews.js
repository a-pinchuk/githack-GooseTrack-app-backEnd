const expressAsyncHandler = require("express-async-handler");

class ControlerReviews {
  getRevies(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("getRevies");
      const reviews = [];

      res.status(200).json({ code: 200, data: reviews, qty: reviews.length });
    });
  }

  getRevieById(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("getRevieById");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  addRevie(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("addRevie");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  changeRevie(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("changeRevie");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }

  deleteRevie(req, res) {
    return expressAsyncHandler(async (req, res) => {
      // const goods = await goodsServices.show({ ...req.query });
      console.log("deleteRevie");
      const review = [];

      res.status(200).json({ code: 200, data: review });
    });
  }
}

const controlerReviews = new ControlerReviews();
export default controlerReviews;
