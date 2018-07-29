const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Nonprofit = mongoose.model('Nonprofit');
const CartItem = mongoose.model('CartItem');
const User = mongoose.model('User')

const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  app.get('/api/users/:id/items', requireLogin, async(req, res) => {
    const user = await User.findById(req.params.id);
    const cart = nonprofit.cart;
    res.send(cart);
  });

  app.post('/api/users/:id/items', requireLogin, async(req, res) => {
    const {item} = req.body;
    const {nonprofitId, amount, _id} = item;

    const user = await User.findById(req.params.id);

    // const newItem = new CartItem({nonprofitId, amount, _id});
    const fullItem = await makeFullItem({nonprofitId, amount, _id})

    try {
      const newCart = {
        ...user.cart
      }

      newCart[fullItem._id] = fullItem;
      user.cart = newCart;
      await user.save();
      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }

  });

  app.put('/api/users/:id/items/:itemId', requireLogin, async(req, res) => {
    const {item} = req.body;
    const {nonprofitId, amount, _id} = item;

    const user = await User.findById(req.params.id);

    const newItem = new CartItem({nonprofitId, amount, _id});
    const fullItem = await makeFullItem({nonprofitId, amount, _id})
    try {
      const newCart = {
        ...user.cart
      }
      newCart[newItem._id] = fullItem;
      user.cart = newCart;
      await user.save();

      console
      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/users/:id/items/:itemId', requireLogin, async(req, res) => {
    const _id = req.params.itemId;

    const user = await User.findById(req.params.id);
    console.log("DELETE", user, _id, req.params)

    try {
      const newCart = {
        ...user.cart
      };
      delete newCart[_id];
      user.cart = newCart;
      console.log('in try', newCart, user)
      await user.save();

      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }
  });
};

async function makeFullItem({nonprofitId, _id, amount}) {
  const nP = await Nonprofit.findById(nonprofitId)
  const nPItem = nP.items[_id]
  const fullItem = new CartItem({
    nonprofitId,
    _id,
    amount,
    image: nPItem.image,
    price: nPItem.price,
    name: nPItem.name
  })
  return fullItem
}