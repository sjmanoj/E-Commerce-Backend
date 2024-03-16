const mongoose = require('mongoose')

const connectDb = async(req,res)=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to DB ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDb