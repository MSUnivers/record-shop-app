const express = require('express');
const recordsRouter = require('./routes/records');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
require('dotenv').config()
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = new low(adapter);
const { mainErrorHandler } = require('./middelwares/errorHandler.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** SETTING UP LOWDB */
//lowdb
/* const  {join, dirname}  =require ("path");
const { Low, JSONFile } =require ("lowdb");
const { fileURLToPath } =require ("url"); */

/**SETTING DB CONNECTION */
const mongoose = require('mongoose');
/** connect to db locally */
mongoose.connect(process.env.DB_HOST);

/** connect to db  atlas (remotly ) */
//mongoose.connect('mongodb://localhost:27017/recordshop');
mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
  console.log("Database connection established...");
});


/** SETTING default data*/
db.defaults({ records: [], users: [], orders: [] }).write();

/** SETTING routes*/
app.use('/records', recordsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
//error handler only for requests that has no handler (route)
app.use(function (req, res, next) {
  const err = new Error('This route is not defined yet');
  err.status = 404;
  next(err)
});



//main error handler middleware
app.use(mainErrorHandler)
const port = process.env.PORT || 3008;
app.listen(port, () => { console.log('the server is up and running on the port: ' + port) });