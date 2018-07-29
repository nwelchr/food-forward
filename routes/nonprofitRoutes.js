const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Nonprofit = mongoose.model('Nonprofit');
const Item = mongoose.model('Item');

const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  app.get('/api/items', requireLogin, async (req, res) => {
    const nonprofit = await Nonprofit.findById(req.user._id);
    const items = nonprofit.items;
    res.send(items);
  });

  app.post('/api/items', requireLogin, async (req, res) => {
    const item = req.body;

    const { name, price, image, quota } = item;

    const nonprofit = await Nonprofit.findById(req.user._id);

    const _id = new ObjectId();

    let newItem = new Item({ name, price, image, quota, _id });

    try {
      nonprofit.items = {
        ...nonprofit.items,
        [newItem._id]: newItem
      };

      await nonprofit.save();
      res.send(newItem);
    } catch (err) {
      console.log(err);
      res.send(400, err);
    }
  });

  app.put('/api/items', requireLogin, async (req, res) => {
    const { item } = req.body;

    const itemId = item._id;

    const nonprofit = await Nonprofit.findById(req.user._id);

    try {
      nonprofit.items[itemId] = item;
      await nonprofit.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/items/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    const nonprofit = await Nonprofit.findById(req.user._id);

    try {
      const newItems = { ...nonprofit.items };
      const item = newItems[id];
      delete newItems[id];
      nonprofit.items = newItems;
      await nonprofit.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });
};
