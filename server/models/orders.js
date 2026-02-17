import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({ 

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    default: null 
  },

  guestId: { 
    type: String, 
    default: null 
  },

  items:[{
    product: { 
      type: mongoose.Schema.Types.ObjectId,   // 🔥 FIXED
      ref: 'product',                         // model name exact hona chahiye
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    },
  }],

  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Order Placed" },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false },

},{ timestamps: true });

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
