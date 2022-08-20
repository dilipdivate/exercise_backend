const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    userrole: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'User' }
);

module.exports = mongoose.model('User', UserSchema);
