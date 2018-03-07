'use strict';

// TEMP: Simple In-Memory Database


const express = require('express');
const app = express();
const morgan = require('morgan');

const data = require('./db/notes');
// const simDB = require('./db/simDB');
// const notes = simDB.initialize(data);
const notesRouter = require('./routers/notes.router');

const { PORT } = require('./config');


console.log('hello world!');
// INSERT EXPRESS APP CODE HERE...





app.use(express.json());
//log all requests
app.use(morgan('dev'));
//create static webserver
app.use(express.static('public'));

app.use('/api', notesRouter);






app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

