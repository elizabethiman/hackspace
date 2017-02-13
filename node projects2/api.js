var express = require('express');
var app = express();
var faker = require('faker');

app.get('/', function (req, res) {
  res.send('Mi primer servidor!');
})

app.get('/friends', function (req, res) {
  var randomName = faker.name.findName();
  var randomEmail = faker.internet.email();
  var randomImage = faker.image.avatar();
  var usuario = {
    nombre: randomName,
    email: randomEmail,
    imagen: randomImage
  }
  res.json(usuario);
})

app.get('/amigos', function (req, res) {
  res.send('Mis amigos');
})


app.listen(3000);