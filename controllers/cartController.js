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

exports.deleteCart =  async(req, res) => {

  const userId = req.user._id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    try {
      await Cart.updateMany({ userId: userId }, { $set: { products: [] } })
      res.status(200).json({ message: 'Products removed from the cart successfully.' })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }

}