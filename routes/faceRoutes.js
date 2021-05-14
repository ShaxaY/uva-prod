const express = require('express');
const faceController = require('../controllers/faceController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(faceController.getAllFaces)
  .post(
    authController.protect,
    authController.accesTo('admin'),
    faceController.uploadFacePhoto,
    faceController.resizeFacePhoto,
    faceController.createFace
  );

router
  .route('/:id')
  .get(faceController.getFace)
  .patch(faceController.updateFace)
  .delete(faceController.deleteFace);

module.exports = router;
