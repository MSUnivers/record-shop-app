const express = require('express');
const recordsRouter = require('./routes/records');
const usersRouter=require('./routes/users');
const ordersRouter = require('./routes/orders');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db =new low(adapter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** SETTING UP LOWDB */
//lowdb
const  {join, dirname}  =require ("path");
const { Low, JSONFile } =require ("lowdb");
const { fileURLToPath } =require ("url");

/** SETTING default data*/
db.defaults({ records:[],users:[],orders:[]}).write();

/** SETTING routes*/
app.use('/records',recordsRouter);
app.use('/users',usersRouter);
app.use('/orders',ordersRouter);
const port=process.env.PORT || 3008;
app.listen(port,()=>{console.log('the server is up and running on the port: '+port)});