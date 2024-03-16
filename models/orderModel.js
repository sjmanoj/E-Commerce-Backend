const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        quantity: Number,
        title: String,
          count: {
            type: Number
        },
          color: {
            type: String,
        },
    }],
      paymentIntent: {},
      orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
          "Not Processed",
          "Cash on Delivery",
          "Processing",
          "Dispatched",
          "Cancelled",
          "Delivered",
        ],
      },
      email:{
        type: String
      },
      address:{
        type: String
      },
      contact:{
        type: String
      },
      orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Orders', orderSchema)