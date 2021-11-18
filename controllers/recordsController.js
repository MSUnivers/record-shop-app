const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRecords = (req, res, next) => {
  console.log("getrecords request");
  const records = db.get("records").value();
  res.status(200).send(records);
};

exports.addRecord = async (req, res) => {
  const record = req.body;
  console.log(record);
  await db
    .get("records")
    .push(record)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
  res.status(200).send('hii');
};

exports.getRecordById = (req, res) => {
  let found = db.get("records").find((element) => element.id == req.params.id);
  res.send(found);
};
exports.updateRecordById = async (req, res) => {
  
  await db
    .get("records")
    .find({ id: req.params.id })
    .assign(req.body)
    .write();
  res.send('the record was succefully updated');
};
exports.deleteRecordById = async (req, res) => {
  await db
    .get("records")
    .remove((element) => element.id == req.params.id)
    .write();
  res.send('the record was succefully deleted');
};
