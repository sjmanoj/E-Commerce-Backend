// const { createCart, getUserCart, emptyUserCart } = require('../controllers/cartController')
const { validateTokenAndAuth, AdminAuth, validateToken } = require('../middlewares/validateTokenHandler')
const router = require('express').Router()
const { addItemToCart, getCart, decreaseQuantity, removeItem } = require('../controllers/cartController')

// router.post('/', validateToken, createCart)

// router.get('/get-user-cart', validateToken, getUserCart)

// router.delete('/empty-user-cart', validateToken, emptyUserCart)

router.post('/', validateToken, addItemToCart)

router.get('/get-cart', validateToken, getCart)

router.post('/decrease-quantity', validateToken, decreaseQuantity)

router.post('/remove-cart-item', validateToken, removeItem)

module.exports = router