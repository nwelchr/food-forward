const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  shoppingCart: Object,
});

mongoose.model('User', userSchema);
