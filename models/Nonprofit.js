const mongoose = require('mongoose');
const { Schema } = mongoose;

const nonprofitSchema = new Schema({
  googleId: String,
  displayName: String,
  items: { type: Schema.Types.ObjectId, ref: 'Item' }
});

mongoose.model('Nonprofit', nonprofitSchema);
