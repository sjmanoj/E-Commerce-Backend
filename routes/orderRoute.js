const { createOrder, getOrders, getOrder, getUserOrders, deleteOrder, updateOrderStatus } = require('../controllers/orderController')
const { validateTokenAndAuth, AdminAuth, validateToken } = require('../middlewares/validateTokenHandler')
const router = require('express').Router()

router.post('/', validateToken, createOrder)

router.get('/user-orders', validateToken, getUserOrders)

router.get('/:id', validateTokenAndAuth, getOrder)

router.get('/', AdminAuth, getOrders)

// router.delete('/:id', AdminAuth, deleteOrder)

router.delete('/:id', validateToken, deleteOrder)

router.put('/:id', AdminAuth, updateOrderStatus)

module.exports = router