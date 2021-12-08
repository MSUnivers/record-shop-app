const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const Records = require("../models/Records.js");
const Orders=require("../models/Orders.js");

exports.getRecords = async (req, res, next) => {
  try {
    let records = await Records.find();
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }

  /* console.log("getrecords request");
  const records = db.get("records").value();
  res.status(200).send(records); */
};

exports.addRecord = async (req, res, next) => {
  try {
    let record = req.body;
    const addedRecord = new Records(record);
    await addedRecord.save();
    res.status(200).send(addedRecord);
  } catch (error) {
    next(error);
  }

  /*  console.log(record);
  await db
    .get("records")
    .push(record)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
  res.status(200).send('hii'); */
};

exports.getRecordById = async (req, res, next) => {
  try {
    let selectedRecord=req.params.id;
    const record=await Records.findById(selectedRecord);
    res.status(200).send(record);
  } catch (error) {
    next(error);
  }
  /* let found = db.get("records").find((element) => element.id == req.params.id);
  res.send(found); */
};
exports.updateRecordById = async (req, res,next) => {
  try {
    let selectedRecord= req.params.id;
    let updateRecordById=await Records.findByIdAndUpdate(selectedRecord,req.body,{new:true});
    res.send("the record was successfully updated")
  } catch (error) {
    next(error)
  }
 /*  await db.get("records").find({ id: req.params.id }).assign(req.body).write();
  res.send("the record was successfully updated"); */
};
exports.deleteRecordById = async (req, res,next) => {
  try {
    let selectedRecord= req.params.id;
    const deleteRecordById=await Records.findByIdAndDelete(selectedRecord);
    res.send("the record was successfully deleted")
  } catch (error) {
    next(error)
  }
  /* await db
    .get("records")
    .remove((element) => element.id == req.params.id)
    .write();
  res.send("the record was successfully deleted"); */
};

