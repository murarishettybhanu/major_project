var FormData = require('form-data');
const axios = require('axios');
var fs = require('fs');

var form = new FormData();
form.append('image', file, file.avatar.jpg);
console.log(form);

// axios.post('localhost:3000/post', form)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });