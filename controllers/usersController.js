const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getAllUsersController = (req, res) => {
  let allUsers = db.get("users");
  res.send(allUsers);
};
exports.postUserController = (req, res) => {
  let user = req.body;
  db.get("users")
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.send(user);
};

exports.getUserByIdController = (req, res) => {
  let user = db.get("users").find({ id: req.params.id });
  res.send(user);
};

exports.updateUserByIdController = (req, res) => {
  db.get("users").find({ id: req.params.id }).assign(req.body).write();
  res.send("the user was updated successfully");
};

exports.deleteUserByIdController = (req, res) => {
  db.get("users").remove({ id: req.params.id }).write();
  res.send("the user was deleted successfully");
};