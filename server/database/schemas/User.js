const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');
const bcrypt = require('bcryptjs');
const R = require('ramda');

const { Schema } = mongoose;

const userSchema = new Schema({
  user: Number,
  email: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  password: { type: String, required: true },
  profile_pic: { type: String },
  adminName: { type: String, maxlength: 20 },
  phoneNumber: { type: Number, maxlength: 11, required: true },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

userSchema.plugin(AutoIncrementID, {
  field: 'user',
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'User',
});

userSchema.virtual('admin_user').get(function() {
  if (this.adminName) {
    return `${this.adminName}`;
  }
  return undefined;
});

userSchema.virtual('initials').get(function() {
  return this.adminName && `${this.adminName[0].concat(this.adminName[1]).toUpperCase()}`;
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) { reject(err1); }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) { reject(err2); }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function() {
  return R.omit(['password', '_id'], this.toObject({ virtuals: true }));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
