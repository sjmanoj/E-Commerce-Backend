const { getUsers, getUser, updateUser, deleteUser, getWishlist, saveUserAddress, createCart } = require('../controllers/userController')
const { validateTokenAndAuth, AdminAuth, validateToken } = require('../middlewares/validateTokenHandler')
const router = require('express').Router()

router.get('/', AdminAuth, getUsers)

router.get('/wishlist', validateToken, getWishlist)

router.put('/save-address', validateToken, saveUserAddress)

router.get('/:id', validateTokenAndAuth, getUser)

router.put('/:id', validateTokenAndAuth, updateUser)

router.delete('/:id', validateTokenAndAuth, deleteUser)

module.exports = router