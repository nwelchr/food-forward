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
      console.log('first NP', nonprofit)
      const nonprofitItem = nonprofit.items[cartItem._id];
      // console.log(nonprofitItem)
      const calculatedPrice = nonprofitItem.price * cartItem.amount;
      nonprofitItem.amtRaised = String(Number(calculatedPrice) + Number(nonprofitItem.amtRaised));
      // nonprofit.items[cartItem._id] = nonprofitItem;
      console.log(nonprofitItem)
      try {
        const newItems = {
          ...nonprofit.items
        };
        const newItem = {
          ...nonprofitItem
        }
        newItem.amtRaised = Number(calculatedPrice) + Number(nonprofitItem.amtRaised)
        newItems[cartItem._id] = newItem
        nonprofit.items = newItems
        console.log("NO P ", nonprofit)
        await nonprofit.save();
        console.log(';alksdfj')
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
