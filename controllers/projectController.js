const multer = require('multer');
const sharp = require('sharp');
const { slugify } = require('transliteration');
const AppError = require('../utils/appError');
const Project = require('../models/projectModel');
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

exports.uploadProjectImages = upload.array('images', 5);

exports.resizeProjectImages = catchAsync(async (req, res, next) => {
  if (!req.files) next();

  const slug = slugify(req.body.name);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `project-${slug}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/projects/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getAllProjects = factory.getAll(Project);
exports.createProject = factory.createOne(Project);
exports.getProject = factory.getOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
