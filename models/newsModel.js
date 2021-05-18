const mongoose = require('mongoose');
const { slugify } = require('transliteration');

const newsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'У новости должно быть имя'],
    unique: [true, 'Такая новость уже существует'],
    trim: true,
    maxlength: [40, 'Максимум 40 симсволов'],
    minlength: [5, 'Минимум 5 символов'],
    photo: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
});

newsSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
