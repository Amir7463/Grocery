import Product from "../models/product.js";
import Order from "../models/orders.js";

// Place order COD (Guest + User)
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, guestId, items, address } = req.body;

    if ((!userId && !guestId) || !items || items.length === 0 || !address) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // calculate total
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.json({ success: false, message: "Product not found" });
      amount += product.offerPrice * item.quantity;
    }
    amount += Math.floor(amount * 0.02); // tax

    const order = await Order.create({
      userId: userId || null,
      guestId: guestId || null,
      items,
      amount,
      address,
      paymentType: "COD"
    });

    return res.json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Get orders (Guest + User)
export const getUserOrder = async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (guestId) filter.guestId = guestId;

    const orders = await Order.find(filter)
      .populate("items.product")   // 🔥 THIS IS REQUIRED
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


// Get all orders (Admin / Seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")   // ✅ ADD THIS
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

