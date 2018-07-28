const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  image: String,
  quota: Number,
  amtRaised: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  _nonprofit: { type: Schema.Types.ObjectId, ref: 'Nonprofit' }
});

mongoose.model('User', userSchema);
