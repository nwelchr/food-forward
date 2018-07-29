const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Nonprofit = mongoose.model('Nonprofit');
const CartItem = mongoose.model('CartItem');
const User = mongoose.model('User')

const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  app.get('/api/users/:id/items', requireLogin, async (req, res) => {
    const user = await User.findById(req.params.id);
    const cart = nonprofit.cart;
    res.send(cart);
  });

  app.post('/api/users/:id/items', requireLogin, async (req, res) => {
    const { item } = req.body;

    const { nonprofitId, amount, _id } = item;

    
    const user = await User.findById(req.params.id);
    
    const newItem = new CartItem({ nonprofitId, amount, _id });
    
    try {
      user.cart[newItem._id] = newItem;
      await user.save();
      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }
  
  });

  app.put('/api/users/:id/items', requireLogin, async (req, res) => {
    const { item } = req.body;

    const user = await User.findById(req.params.id);

    try {
      user.cart[_id] = item;
      await user.save();

      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/users/:id/items', requireLogin, async (req, res) => {
    const { _id } = req.body;

    const user = await User.findById(req.params.id);

    try {
      delete user.cart[_id];
      await user.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });
};
