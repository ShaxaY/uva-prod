const multer = require('multer');
const sharp = require('sharp');
const { slugify } = require('transliteration');
const Face = require('../models/faceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Файл не является изображением', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFacePhoto = upload.single('photo');

exports.resizeFacePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const slug = slugify(req.body.name);

  req.file.filename = `face-${slug}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/faces/${req.file.filename}`);

  req.body.photo = req.file.filename;

  next();
});

exports.createFace = factory.createOne(Face);
exports.getAllFaces = factory.getAll(Face);
exports.getFace = factory.getOne(Face);
exports.updateFace = factory.updateOne(Face);
exports.deleteFace = factory.deleteOne(Face);
