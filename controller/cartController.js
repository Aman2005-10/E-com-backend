import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // 1. Product exists?
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2. User ki cart find karo
    let cart = await Cart.findOne({ user: userId });

    // 3. Agar cart nahi hai
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart,
      });
    }

    // 4. Cart hai, check karo product already hai ya nahi
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product pehle se hai
      cart.items[itemIndex].quantity += 1;
    } else {
      // Naya product add karo
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const data = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const removeCart = async (req , res) => {

  try {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find product in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove product from cart
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
     console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }


}

export const increaseQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find product in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Increase quantity
    cart.items[itemIndex].quantity += 1;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const decreaseQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find product in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Decrease quantity
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // Remove product if quantity becomes 0
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}; 