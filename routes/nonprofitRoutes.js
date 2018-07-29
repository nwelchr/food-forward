const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Nonprofit = mongoose.model('Nonprofit');
const Item = mongoose.model('Item');

const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  app.get('/api/nonprofits/:id/items', requireLogin, async (req, res) => {
    const nonprofit = await Nonprofit.findById(req.params.id);
    const items = nonprofit.items;
    res.send(items);
  });

  app.post('/api/nonprofits/:id/items', requireLogin, async (req, res) => {
    const { item } = req.body;

    const { name, price, image, quota } = item;

    const nonprofit = await Nonprofit.findById(req.params.id);

    const item = new Item({ name, price, image, quota });

    item._id = new ObjectId();

    try {
      nonprofit.items[item._id] = item;
      await nonprofit.save();

      res.send(item);
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
