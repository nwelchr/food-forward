const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  image: String,
  quota: String,
  price: String,
  amtRaised: {
    type: String,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _nonprofit: { type: Schema.Types.ObjectId, ref: 'Nonprofit' }
});

mongoose.model('Item', itemSchema);
