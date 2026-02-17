import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String },    // logged-in user
  guestId: { type: String },   // guest user
  items: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
