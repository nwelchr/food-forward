const mongoose = require('mongoose');
const { Schema } = mongoose;

const nonprofitSchema = new Schema({
  googleId: String,
  displayName: String,
  neededItems: Object,
});

mongoose.model('Nonprofit', nonprofitSchema);
