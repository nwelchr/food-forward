const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  image: String,
  quota: Number,
  price: Number,
  amtRaised: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _nonprofit: { type: Schema.Types.ObjectId, ref: 'Nonprofit' }
});

mongoose.model('Item', itemSchema);
