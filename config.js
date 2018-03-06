'use strict';
module.exports.PORT = 8080;
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(requestLogger);

function requestLogger(req, res, next){
  const now = new Date();
  console.log(now, req.method, req.url);
  next();
}
