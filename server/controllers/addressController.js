  import Address from "../models/address.js";

  // ✅ Add address (guest + logged-in)
  export const addAddress = async (req, res) => {
    try {
      const { address, userId, guestId } = req.body;

      const newAddress = await Address.create({
        ...address,
        userId: userId || null,
        guestId: guestId || null
      });

      res.status(201).json({ message: "Address added", address: newAddress });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding address" });
    }
  };

  // ✅ Get addresses (guest + logged-in)
  export const getAddresses = async (req, res) => {
    try {
      const { userId, guestId } = req.query;

      const addresses = await Address.find({
        $or: [
          { userId: userId || null },
          { guestId: guestId || null }
        ]
      });

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching addresses" });
    }
  };
