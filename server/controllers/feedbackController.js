const errors = require("../errors");

const { Feedback } = require("../models");

class feedbackController {
  async create(req, res, next) {
    try {
      const { title, message } = req.body;
      console.log("Received feedback:", req.body);
      const userId = req.user.id;
      const review = await Feedback.create({ title, message, userId });
      return res.json(review);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const reviews = await Feedback.findAndCountAll({ where: {userId : userId} });
      return res.json(reviews);
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }

  async delOne(req, res, next) {
    try {
      const { id } = req.params;
      const review = await Feedback.destroy({ where: { id: id } });
      if (review) {
        return res.json("del");
      } else {
        return next(errors.badRequest("Не удалось удалить"));
      }
    } catch (e) {
      next(errors.badRequest(e.message));
    }
  }
}

module.exports = new feedbackController();
