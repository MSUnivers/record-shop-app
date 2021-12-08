const mongoose = require("mongoose");
const addressModel = require("../models/Addresses");
const UserSchema = require("../models/Users");

const addAddressController = async (req, res, next) => {
  const address = req.body;
  try {
    const newAddress = await addressModel.create(address);
    res.status(200).json(newAddress);
  } catch (error) {
    next(error);
  }
};
const getAllAddressesController = async (req, res, next) => {
  try {
    const listOfAddresses = await addressModel.find().populate('user','firstName lastName');
    console.log(listOfAddresses);
    res.status(200).send(listOfAddresses);
  } catch (error) {
    next(error);
  }
};
const getAddressByIdController = async (req, res, next) => {
  const selectedAddress = req.params.aid;
  try {
      
    const foundAddress = await addressModel.findById(selectedAddress);
    res.status(200).json(foundAddress);
  } catch (error) {
    next(error);
  }
};

const addUserToAddress = async (req, res, next) => {
    const selectedAddress = req.params.aid;
    const selectedUser=req.params.uid;
    try {
        const foundUser=await UserSchema.findById(selectedUser)
      const updatedAddress = await addressModel.findByIdAndUpdate({_id:selectedAddress,user:{$ne:foundUser._id}},{$push:{user:foundUser._id}},{ new: true });
      res.status(200).json(updatedAddress);
    } catch (error) {
      next(error);
    }
  };
module.exports = {
  addAddressController,
  getAllAddressesController,
  getAddressByIdController,addUserToAddress
};
