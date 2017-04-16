'use strict';

const express = require('express'),
      app = express();

//app.use(express.static('dist'));
app.use('/static', express.static('dist'));

app.get('/', function(pedido, respuesta){
  respuesta.sendfile('dist/index.html')
});

app.listen(3000, function(){
  console.log('Fikphy corriendo en el puerto 3000')
});
