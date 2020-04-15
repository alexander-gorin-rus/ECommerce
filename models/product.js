const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Category'
    // },
    category: {
      type: Number,
      default: 1
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      default: []
    },
    // photo: {
    //   type: Buffer,
    //   contentType: String
    // },
    viewed: {
      type: Number,
      default: 0
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('Product', productSchema);
