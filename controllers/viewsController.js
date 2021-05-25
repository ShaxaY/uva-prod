const Project = require('../models/projectModel');
const Face = require('../models/faceModel');
const News = require('../models/newsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour data from collection
  const projects = await Project.find();
  // 2) Build template

  // 3) Render template

  res.status(200).render('overview', {
    title: 'Главная',
    projects,
  });
});

exports.getNews = catchAsync(async (req, res, next) => {
  const news = await News.find();
  res.status(200).render('news', {
    title: 'Новости',
    news,
  });
});

exports.getOneNews = catchAsync(async (req, res, next) => {
  const news = await News.findOne({ slug: req.params.slug });
  res.status(200).render('news-single', {
    title: 'Новости',
    news,
  });
});

exports.getFaces = catchAsync(async (req, res, next) => {
  const faces = await Face.find();

  res.status(200).render('faces', {
    title: 'Лица',
    faces,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return next(new AppError('There is no project with that name', 404));
  }

  res.status(200).render('project', {
    title: project.name,
    project,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Войдите в свой аккаунт',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Мой профиль',
  });
};

exports.AddProject = (req, res) => {
  res.status(200).render('addProject', {
    title: 'Добавить Проект',
  });
};

exports.AddFace = (req, res) => {
  res.status(200).render('addFace', {
    title: 'Добавить Лицо',
  });
};
