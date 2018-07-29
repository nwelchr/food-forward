const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  _id: String,
  nonprofitId: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('CartItem', cartItemSchema);
