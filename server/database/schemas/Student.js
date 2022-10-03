const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  ageInput: { type: Number, required: true },
  gradeClass: { type: String, required: true },
  grayCase: { type: String, required: true },
  gender: { type: String, required: true },
  archived: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
