const { Schema, model } = require("mongoose");

const addressModel = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Address", addressModel);
