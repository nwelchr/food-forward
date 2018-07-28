const mongoose = require('mongoose');
const { Schema } = mongoose;

const nonprofitSchema = new Schema({
  googleId: String,
  displayName: String,
  neededItems: { type: Schema.Types.ObjectId, ref: 'Item' }
});

mongoose.model('Nonprofit', nonprofitSchema);
