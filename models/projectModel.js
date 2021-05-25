const mongoose = require('mongoose');
const { slugify } = require('transliteration');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'У проекта должно быть имя'],
    unique: true,
    trim: true,
    maxlength: [40, 'Максимум 40 символов'],
    minlength: [5, 'Минимум 5 символов'],
  },
  vol: Number,
  goals: [String],
  targets: [String],
  actions: [String],
  results: [String],
  city: {
    type: String,
    trim: true,
    maxlength: [20, 'Максимум 20 символов'],
    minlength: [3, 'Минимум 3 символа'],
  },
  slug: {
    type: String,
  },
  imageCover: {
    type: String,
    // required: [true, 'У проекта должно быть фото'],
  },
  images: [String],
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: 'Point',
      },
      coordinates: [Number],
      adress: String,
      description: String,
    },
  ],
});

projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

projectSchema.pre('save', function (next) {
  this.imageCover = this.images[0];
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
