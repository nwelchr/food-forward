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
    console.log('POSTED', item, req.params.id)
    const {nonprofitId, amount, _id} = item;

    const user = await User.findById(req.params.id);

    // const newItem = new CartItem({nonprofitId, amount, _id});
    const fullItem = await makeFullItem({nonprofitId, amount, _id})

    console.log('post post', user, fullItem)
    try {
      console.log('test')
      const newCart = {
        ...user.cart
      }
      console.log('test2', newCart)

      newCart[fullItem._id] = fullItem;
      user.cart = newCart;
      console.log('newcart', newCart)
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
      console.log('user', user)
      await user.save();

      console
      res.send(user.cart);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/users/:id/items', requireLogin, async(req, res) => {
    const _id = req.body;

    const user = await User.findById(req.params.id);

    try {
      const cart = {
        ...user.cart
      };
      const item = cart[_id];
      delete cart[_id];
      user.cart = cart;
      await user.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });
};

async function makeFullItem({nonprofitId, _id, amount}) {
  console.log("MAKE FULL ITEM!!!!!!!!")
  console.log('before')
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
  console.log('after', fullItem)
  return fullItem
}