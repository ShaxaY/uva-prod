const mongoose = require('mongoose');
const { slugify } = require('transliteration');

const faceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  photo: String,
  vocation: {
    type: String,
    trim: true,
    required: true,
  },
  experience: {
    type: Number,
    trim: true,
    required: true,
  },
  specialization: {
    type: String,
    trim: true,
    required: true,
  },
  activity: {
    type: String,
    trim: true,
    required: true,
  },
  bestProjects: [
    {
      name: {
        type: String,
        trim: true,
      },
      year: Number,
      description: String,
    },
  ],
  awards: [String],
  international: [
    {
      name: String,
      year: Number,
      status: String,
      country: String,
    },
  ],
  slug: String,
});

faceSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

const Face = mongoose.model('Face', faceSchema);

module.exports = Face;
