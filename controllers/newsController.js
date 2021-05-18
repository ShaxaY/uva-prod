const multer = require('multer');
const sharp = require('sharp');
const { slugify } = require('transliteration');
const AppError = require('../utils/appError');
const News = require('../models/newsModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

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

exports.uploadProjectImages = upload.single('photo');

exports.resizeNewsPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const slug = slugify(req.body.name);

  req.file.filename = `news-${slug}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/news/${req.file.filename}`);

  req.body.photo = req.file.filename;

  next();
});

exports.createNews = factory.createOne(News);
exports.getAllNews = factory.getAll(News);
exports.getNews = factory.getOne(News);
