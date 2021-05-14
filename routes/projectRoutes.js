const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.accesTo('admin'),
    projectController.uploadProjectImages,
    projectController.resizeProjectImages,
    projectController.createProject
  );

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
