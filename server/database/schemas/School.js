const mongoose = require('mongoose');

const { Schema } = mongoose;

const schoolSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  schoolName: { type: String, require: true },
  address: { type: String, require: true },
  rcNumber: { type: Number, require: true, maxlength: 8 },
  state: { type: String, require: true },
  country: { type: String, require: true },
  profile_img: { type: String },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const School = mongoose.model('School', schoolSchema);

module.exports = School;
