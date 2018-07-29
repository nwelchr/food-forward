const mongoose = require('mongoose');
const { Schema } = mongoose;

const nonprofitSchema = new Schema({
  googleId: String,
  displayName: String,
  items: Object
});

mongoose.model('Nonprofit', nonprofitSchema);
