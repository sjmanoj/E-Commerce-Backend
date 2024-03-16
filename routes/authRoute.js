const router = require('express').Router()
const { userRegister, loginUser } = require('../controllers/authController')


router.post('/register', userRegister)

router.post('/login', loginUser)

//router.post('/login', logoutUser)

//router.get('/refresh', handleRefreshToken)

module.exports = router