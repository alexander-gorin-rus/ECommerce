const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      required: true
    },
    category: {
      type: ObjectId,
      ref: 'Category'
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      type: Buffer,
      contentType: String
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('Product', productSchema);
