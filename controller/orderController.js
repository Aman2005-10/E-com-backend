import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const orderPlace = async (req, res) => {
    
    try {
        const { shippingAddress,  orderName} = req.body;

        if(!shippingAddress || !orderName){
             return res.status(400).json({
        success:false,
        message:"Shipping address and Name Also  required"
    });
        }

       const cart = await Cart.findOne({
  user: req.user._id,
}).populate("items.product");

      if (!cart || cart.items.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Cart is empty",
  });
}

        let  totalamount = 0;

        cart.items.forEach((item) => {
            totalamount += item.product.price * item.quantity
        })

        // create an order 

        const order = await Order.create({
            user : req.user._id,
            items:cart.items.map((item) => (
                {
                    product:item.product._id,
                    quantity:item.quantity
                }
            )),
            totalAmount:totalamount,
            orderName,
            shippingAddress,
            paymentMethod: "COD"

        })

        await Cart.findOneAndDelete({ user: req.user._id });
        return res.status(201).json({
   success:true,
   message:"Order placed successfully",
   order
})


        
    } catch (error) {
        console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    }

}


export const GetUserOrder = async(req, res) => {

    try {
        const orders = await Order.find({user:req.user._id}).populate("items.product");

      if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
        

        return res.status(200).send({
            success:true,
            message:"Order Get Successfully",
            orders
        })
        
    } catch (error) {
         console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    }

}


export const getAdminOrder = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email").populate("items.product");
        if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
        

        return res.status(200).send({
            success:true,
            message:"Order Get Successfully",
            orders
        })
     

        
    } catch (error) {
          console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    }

}

export const updateAdminOrderStatus = async (req, res) => {
try {
    const orderId = req.params.id
    const {orderStatus} = req.body;


    const order = await Order.findById(orderId);

    if (!order) {
   // Order not found
    return res.status(404).json({
        success: false,
        message: "No order found",
      });
}
order.orderStatus = orderStatus;

await order.save();
return res.status(200).json({
   success: true,
   message: "Order status updated",
   order
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


export const updateAdminPaymentStatus = async (req, res) => {
try {
    const orderId = req.params.id
    const {paymentStatus} = req.body;


    const order = await Order.findById(orderId);

    if (!order) {
   // Order not found
    return res.status(404).json({
        success: false,
        message: "No order found",
      });
}
order.paymentStatus = paymentStatus;

await order.save();
return res.status(200).json({
   success: true,
   message: "Payment Status  updated",
   order
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