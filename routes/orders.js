const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const{getAllOrdersController,postOrdersController,getOrderByIdController,updateOrderByIdController,deleteOrderByIdController,buyRecord}=require('../controllers/ordersController')
/**Get all Orders and POST user route */
router.route('/').get(getAllOrdersController).post(postOrdersController)
/**Get DELETE and UPDATE user by id and POST user route */
router.route('/:id').get(getOrderByIdController) .put(updateOrderByIdController).delete(deleteOrderByIdController) 

router.route('/buy/:rid/:oid').put(buyRecord)
module.exports = router;