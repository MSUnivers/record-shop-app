const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getAllOrdersController = (req, res) => {
  let allorders = db.get("orders");
  res.send(allorders);
};
exports.postOrdersController = (req, res) => {
  let order = req.body;
 db.get("orders")
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
res.end()
};

exports.getOrderByIdController = (req, res) => {
  let order = db.get("orders").find({ id: req.params.id });
  res.send(order);
};

exports.updateOrderByIdController = (req, res) => {
  db.get("orders").find({ id: req.params.id }).assign(req.body).write();
  res.send("the user was updated successfully");
};

exports.deleteOrderByIdController = (req, res) => {
  db.get("orders").remove({ id: req.params.id }).write();
  res.send("the user was deleted successfully");
};
