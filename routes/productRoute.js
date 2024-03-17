const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, addToWishlist, rating } = require('../controllers/productController')
const { validateToken, validateTokenAndAuth, AdminAuth } = require('../middlewares/validateTokenHandler')
const router = require('express').Router()

router.put('/wishlist', validateToken ,addToWishlist)

router.put('/rating', validateToken, rating)

router.get('/', getProducts)

router.get('/seller-prod', AdminAuth, getSellerProducts)

router.post('/', AdminAuth, createProduct)

router.get('/:id', getProduct)

router.put('/:id', AdminAuth, updateProduct)

router.delete('/:id', AdminAuth, deleteProduct)



module.exports = router