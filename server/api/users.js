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
//GET /api/users/:userId/cart, load an unfilled order (cart) based on the user's orders
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product,
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//POST /api/users/:userId/cart (CREATE A NEW CART)
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.create({
      userId: req.params.userId,
      isFulfilled: false,
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});