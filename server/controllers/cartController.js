import Cart from "../models/Cart.js";

// Add/update cart
export const addToCart = async (req, res) => {
  try {
    const { userId, guestId, cartItems } = req.body;
    if (!userId && !guestId) return res.status(400).json({ message: "UserId or GuestId required" });

    const filter = userId ? { userId } : { guestId };
    const cart = await Cart.findOneAndUpdate(filter, { items: cartItems }, { new: true, upsert: true });
    res.status(200).json({ message: "Cart updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cart" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ $or: [{ userId: id }, { guestId: id }] });
    res.status(200).json({ cartItems: cart?.items || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};
