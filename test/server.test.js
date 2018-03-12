'use strict';
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);


describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
  
});  
describe('404 handler', function () {
  
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  
});
describe('GET /notes', function () {

  it('should return the default 10 notes', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.have.all.keys(
            'id', 'title', 'content');
        });
      });
  });
    
});  
describe('404 handler', function () {
    
  it('error for GET /api/notes', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
    
});

describe('GET /api/notes/:id', function() {
  it('should return correct item', function () {
    return chai.request(app)
      .get('/api/notes/1000')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.be.json;
        expect(res.body.id).to.equal(1000);
      });

  });
  it('error for GET /api/notes/:id', function () {
    return chai.request(app)
      .put('/api/notes/9999')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});
describe('PUT /api/notes/:id', function() {
  it('should update the note', function() {
    const updateItem = {
      'title': 'Cutest Pups',
      'content': 'chewie forevaa'
    };
    return chai.request(app)
      .put('/api/notes/1005')
      .send(updateItem)
      .then(function (res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body.id).to.equal(1005);
        expect(res.body.title).to.equal(updateItem.title);
      });
  });
  it('404 error for PUT /api/notes/:id', function () {
    const updateItem = {
      'title': 'Cutest Pups',
      'content': 'chewie forevaa'
    };
    return chai.request(app)
      .put('/api/notes/9999')
      .send(updateItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  it('should return an error when "title" is missing', function() {
    const newItem ={
      'foo': 'bar'
    };
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});
describe('POST /api/notes', function() {
  it('should create a new item', function() {
    const newItem = {
      'title': 'Cutest Pups',
      'content': 'chewie forevaa'
    };
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.id).to.equal(1010);
        expect(res.body.title).to.equal(newItem.title);
        expect(res.body.content).to.equal(newItem.content);

      });
  });
  it('should return an error when "title" is missing', function() {
    const newItem ={
      'foo': 'bar'
    };
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});
describe('DELETE /api/notes/:id', function() {
  it('should delete item at id', function() {
    return chai.request(app)
      .delete('/api/notes/1005')
      .then(function(res) {
        expect(res).to.have.status(204);

      });
  });
  it('should return 404 if id not found', function() {
    return chai.request(app)
      .delete('/api/notes/999')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});
