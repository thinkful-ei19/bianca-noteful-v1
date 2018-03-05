'use strict';

// TEMP: Simple In-Memory Database
const data = require('./db/notes');




console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();
app.use(express.static('public'));
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes/?', (req, res) => {
  const query = req.query;
  const searchQuery = data.filter(function(item) {
    if(item.title.includes(query.searchTerm)){
      return item;
    }else if (item.content.includes(query.searchTerm)){
      return item;
    }
  });
  res.json(searchQuery);
});

app.get('/api/notes', (req, res) => {
  res.json(data);
});
app.get('/api/notes/:id', (req, res) =>{
  const {id} = req.params;
  res.json(data.find(item => item.id === Number(id)));
});
