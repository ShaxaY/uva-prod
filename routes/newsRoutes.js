const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(newsController.getAllNews)
  .post(
    authController.protect,
    authController.accesTo('admin'),
    newsController.resizeNewsPhoto,
    newsController.createNews
  );

router.route('/:id').get(newsController.getNews);

module.exports = router;
