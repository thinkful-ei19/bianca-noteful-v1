/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();
  //these are just tests


  api.search({})
    .then(response => {
      store.notes = response;
      noteful.render();
    });
  // api.search({searchTerm: 'government'})
  //   .then(response => {
  //     console.log(response);
  //   });
  // api.details(1002)
  //   .then(response => {
  //     console.log(response);
  //   });
  // api.update(1002, {title:'more cats', content:'nada'})
  //   .then(response => {
  //     console.log(response);
  //   });
});
