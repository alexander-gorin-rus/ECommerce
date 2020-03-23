const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    history: {
      type: Array
    }
  },
  { timestamps: true }
);

// consumerSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = uuid();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// consumerSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function(password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   }
// };

module.exports = mongoose.model('Consumer', consumerSchema);
