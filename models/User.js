const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  cart: { type: Schema.Types.ObjectId, ref: 'CartItem' }
});

mongoose.model('User', userSchema);
