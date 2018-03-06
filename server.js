'use strict';

// TEMP: Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./config');


console.log('hello world!');
// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.json());




app.get('/api/notes/', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });

}); 
  
  
// const query = req.query;
// const searchQuery = data.filter(function(item) {
//   if(item.title.includes(query.searchTerm)){
//     return item;
//   }else if(item.content.includes(query.searchTerm)){
//     return item;
//   } 
// });
// if(query.searchTerm === undefined){
//   res.json(data);
// } else {
//   res.json(searchQuery);
// }



app.get('/api/notes', (req, res) => {
  res.json(data);
});
app.get('/api/notes/:id', (req, res, next) =>{
  const { id } = req.params;
  //res.json(data.find(item => item.id === Number(id)));

  notes.find(1005, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      console.log('not found');
    }
  });  
});
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

