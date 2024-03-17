const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'productName is required'],
        trim: true
    },
    slug:{
        type: String,
        required: [true, 'productName is required'],
        unique: true,
        lowercase: true
    },
    price:{
        type: Number,
        required: [true, 'price is required']
    },
    categories:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        // required: true
    },
    quantity:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0,
        select: false
    },
    color:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    size:{
        type:String
    },
    ratings:[{
        star: Number,
        comments: String,
        postedby:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    totalRatings:{
        type: String,
        default: 0
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },   
},
{
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)