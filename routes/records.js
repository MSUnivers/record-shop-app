const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const { getRecords, addRecord ,getRecordById,updateRecordById,deleteRecordById} = require('../controllers/recordsController');


/**
 * GET all records and POST route
 */
router.route('/').get(getRecords).post(addRecord);
/**
 * GET PUT DELETE by ID
 */

router.route('/:id').get(getRecordById).put(updateRecordById).delete(deleteRecordById)

module.exports = router;