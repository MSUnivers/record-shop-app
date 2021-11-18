const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const{getAllUsersController,postUserController,getUserByIdController,updateUserByIdController,deleteUserByIdController}=require('../controllers/usersController')
/**Get all users and POST user route */
router.route('/').get(getAllUsersController).post(postUserController)
/**Get DELETE and UPDATE user by id and POST user route */
router.route('/:id').get(getUserByIdController) .put(updateUserByIdController).delete(deleteUserByIdController) 
module.exports = router;