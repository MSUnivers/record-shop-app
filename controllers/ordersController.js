const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const Order = require("../models/Orders.js");
const record=require("../models/Records.js");

exports.getAllOrdersController = async (req, res, next) => {
  /**code to fetch data from db atlas */
  try {
    const allOrders = await Order.find().populate('record','title');
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
  /**Code to fetch data from lowdb */
  /*  let allorders = db.get("orders"); */
  //res.send(allorders);
};
exports.postOrdersController = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderByIdController = async (req, res, next) => {
  /** code with MD ATLAS */

  try {
    let requestedOrder = req.params.id;
    const selectedOrder = await Order.findOne({ id: requestedOrder });
    res.send(selectedOrder);
  } catch (error) {}

  /**code with lowdb */
  /*  let order = db.get("orders").find({ id: req.params.id });
   res.send(order); */
};

exports.updateOrderByIdController = async (req, res, next) => {
  /* db.get("orders").find({ id: req.params.id }).assign(req.body).write();
  res.send("the user was updated successfully"); */
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderByIdController = async (req, res, next) => {
  /**code with DB ATLAS */
  try {
    let selectedOrder = req.params.id;
    const deletedOrder = await Order.deleteOne({ id: selectedOrder });
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
  /**code with lowdb */
  /* db.get("orders").remove({ id: req.params.id }).write();
  res.send("the user was deleted successfully"); */
};
exports.buyRecord=async (req, res,next) => {
  try {
    let selectedRecord=req.params.rid;
    let order=req.params.oid;
    let foundRecord=await record.findById(selectedRecord)
    let updatedOrder=await Order.findByIdAndUpdate({_id:order},{$push:{record:foundRecord._id}},{new:true})
    res.status(200).send(updatedOrder);
  } catch (error) {
    next(error)
  }
}
