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
    const { item } = req.body;

    const { name, price, image, quota } = item;

    const nonprofit = await Nonprofit.findById(req.params.id);

    const newItem = new Item({ name, price, image, quota });

    newItem._id = new ObjectId();

    try {
      nonprofit.items[newItem._id] = newItem;
      await nonprofit.save();

      res.send(newItem);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.put('/api/nonprofits/:id/items', requireLogin, async (req, res) => {
    const { item } = req.body;

    const itemId = item._id;

    const nonprofit = await Nonprofit.findById(req.params.id);

    try {
      nonprofit.items[itemId] = item;
      await nonprofit.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/nonprofits/:id/items', requireLogin, async (req, res) => {
    const { _id } = req.body;

    const nonprofit = await Nonprofit.findById(req.params.id);

    try {
      delete nonprofit.items[_id];
      await nonprofit.save();

      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });
};
