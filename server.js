const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const express = require('express')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5050
app.use(cors())
//app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())


app.use('/auth', require('./routes/authRoute'))
app.use('/users', require('./routes/userRoute'))
app.use('/products', require('./routes/productRoute'))
app.use('/carts', require('./routes/cartRoute'))
app.use('/orders', require('./routes/orderRoute'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    connectDb()
    console.log(`Listening to ${port}`);
})