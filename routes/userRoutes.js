const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Nonprofit = mongoose.model('Nonprofit');
const User = mongoose.model('User');
const Item = mongoose.model('Item');
const CartItem = mongoose.model('CartItem');

module.exports = app => {
  app.patch('/api/users/:id/pay', requireLogin, async(req, res) => {

    console.log('PAYING IT FORWARD')

    const user = await User.findById(req.params.id);

    const cart = user.cart;

    // Update items for nonprofit
    for (let cartItemId in cart) {
      const cartItem = cart[cartItemId]
      console.log(cartItem)
      const nonprofit = await Nonprofit.findById(cartItem.nonprofitId);
      const nonprofitItem = nonprofit.items[cartItem._id];
      const calculatedPrice = nonprofitItem.price * cartItem.amount;
      nonprofitItem.amtRaised += calculatedPrice;
      nonprofit.items[nonprofitId] = nonprofitItem;
      try {
        await nonprofit.save();
      } catch (err) {
        res.send(err, null);
      }
    }

    // Clear user cart
    user.cart = {};
    try {
      await user.save();
    } catch (err) {
      res.send(err, null);
    }

    res.send(user);
  });

  app.patch('/api/users/:id/clear_cart', requireLogin, async(req, res) => {
    const user = await User.findById(req.params.id);

    user.cart = {};
    try {
      await user.save();
    } catch (err) {
      res.send(err, null);
    }

    res.send(user);
  });
};
