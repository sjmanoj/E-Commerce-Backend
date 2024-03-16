const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    address: {
        type: String,
    },
    wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Products" 
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)