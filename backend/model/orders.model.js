const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    product_title: String,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true, // Add timestamps (createdAt and updatedAt)
  }
);

const Orders = mongoose.model('Purchase', orderSchema);

module.exports = Orders;
