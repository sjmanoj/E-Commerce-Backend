// const asyncHandler = require('express-async-handler')
// const Users = require('../models/userModel')
// const Carts = require('../models/cartModel')
// const Products = require('../models/productModel')

//Create your Cart
// createCart = asyncHandler(async(req,res)=>{
//     const userId = req.user._id
//     console.log(userId)
//     if (!userId){
//         res.status(400)
//         throw new Error('No such user Found')
//     }
//     const userAvailable = await Users.findById(userId)
//     const {cart} = req.body
//     console.log(req.body);
//     let products = []
//     const cartAvailable = await Carts.findOne({orderby: userAvailable._id})
//     if (cartAvailable){
//         await Carts.findOneAndDelete(cartAvailable)
//     }
//     for (let i=0; i<cart.length; i++){
//         let object = {}
//         object.productId = cart[i].productId,
//         object.count = cart[i].count,
//         object.color = cart[i].color
//         let getPrice = await Products.findById(cart[i].productId).select('price')
//         object.price = getPrice.price
//         products.push(object)
//     }
//     let cartTotal = 0
//     for (let i=0; i<products.length; i++){
//         cartTotal = cartTotal + products[i].price * products[i].count
//     }
//     let newCart = await new Carts({
//         products, cartTotal, orderby: userId
//     }).save()
//     res.json(newCart)
// })

// //Get your User Cart
// getUserCart = asyncHandler(async(req,res)=>{
//     userId = req.user._id
//     const cartAvailable = await Carts.findOne({orderby: userId}).populate("products.productId")
//     res.json(cartAvailable)
// })

// //Empty your User Cart
// emptyUserCart = asyncHandler(async (req, res) => {
//     userId = req.user._id
//     const cartAvailble = await Carts.findOne({ orderby: userId })
//     //console.log(cartAvailble);
//     await Carts.findOneAndDelete({ orderby: userId })
//     res.json(cartAvailble);
// })

// module.exports = { createCart, getUserCart, emptyUserCart }

const { isValidObjectId } = require("mongoose");
const { Cart } = require("../models/cartModel");
const { Users } = require("../models/userModel");
const { Products } = require("../models/productModel");

exports.addItemToCart = async (req, res) => {
    const userId = req.user._id
    // console.log(userId)
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    // console.log(userId);
    const userAvailable = await Users?.findById(userId)
    

  let {productId, quantity, title, price, image} = req.body
  if (!productId)
    return res.status(400).send({ status: false, message: "Invalid product" });
  
  let productAvailable = await Products?.findOne({_id: req.body.productId});
  // console.log(productAvailable);

  let cart = await Cart.findOne({ userId: userId });
  if (cart) {
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity += quantity;
      cart.products[itemIndex] = productItem;
    } else {
      await cart.products.push({ productId: productId, quantity: quantity, title: title, image: image, price: price });
    }
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  } else {
    const newCart = await Cart.create({
      userId,
      products: [{ productId: productId, quantity: quantity, title: title, image: image, price: price }],
    });

    return res.status(201).send({ status: true, newCart: newCart });
  }
};

exports.getCart = async (req, res) => {
    const userId = req.user._id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    // console.log(userId);
    const userAvailable = await Users?.findById(userId)

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });
  // console.log(cart.products.length);
  cartCount = cart.products.length

  res.status(200).send({ status: true, cart: cart, cartCount: cartCount });
};

exports.decreaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  const userId = req.user._id
  if (!userId){
    res.status(400)
    throw new Error('No such user Found')
}
// console.log(userId);
const userAvailable = await Users?.findById(userId)

  let productId = req.body.productId;
  let quantity = req.body.quantity

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
    productItem.quantity -= quantity;
    cart.products[itemIndex] = productItem;
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};

exports.removeItem = async (req, res) => {
    const userId = req.user._id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }

  let productId = req.body.productId;

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .json({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(200).json({ status: true, updatedCart: cart });
  }else{
    return res
    .status(400)
    .json({ status: false, message: "Item does not exist in cart" });
  }
  
};