const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');
const Product = require('../db/models/Product');


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get a single user, and eager load its orders and orderProducts
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});