const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Item');

module.exports = app => {
  app.post('/api/blogs', requireLogin, async(req, res) => {
    const {name, image, quota} = req.body;

    const item = new Item({title, image, quota, _nonprofit: req.user.id});

    try {
      await item.save();
      res.send(item);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.patch('/api/blogs/:id', requireLogin, async(req, res) => {
    const updated = req.body
    Item.findById(id, (err, item) => {
      item = updated
      
    })
  })
};
