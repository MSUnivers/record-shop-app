const express = require("express");
const router = express.Router();
const {
  addAddressController,
  getAllAddressesController,
  getAddressByIdController,
  addUserToAddress,
} = require("../controllers/addressesController");

router.post("/", addAddressController);
router.get("/all", getAllAddressesController);
router.get("/:aid", getAddressByIdController);
router.put("/:uid/:aid", addUserToAddress);

module.exports = router;
