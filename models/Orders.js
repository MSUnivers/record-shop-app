const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  record:[{type:Schema.Types.ObjectId,ref:'Record'}]
});
// { items: [{record: 4238402384039, quantity: 3}, {record: 2342394823098, quantity: 2}]
//    user: 8340958340953, address: 09384059384, deliveryStatus: delivered
//}

module.exports = mongoose.model("Order", OrderSchema);