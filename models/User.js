const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  cart: {
    type: Object,
    default: {}
  }
});

mongoose.model('User', userSchema);
