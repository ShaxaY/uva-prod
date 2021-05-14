const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/faces', authController.isLoggedIn, viewsController.getFaces);
router.get(
  '/project/:slug',
  authController.isLoggedIn,
  viewsController.getProject
);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/add-project',
  authController.protect,
  authController.accesTo('admin'),
  viewsController.AddProject
);
router.get(
  '/addface',
  authController.protect,
  authController.accesTo('admin'),
  viewsController.AddFace
);

module.exports = router;
