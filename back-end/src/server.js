const express = require('express');
const cors = require('cors');
const route_pessoa  = require('../src/routes/pessoa_route');
const route_usuario = require('../src/routes/usuario_route');


const app = express();
app.use(express.json())
app.use(cors());

require('./routes/usuario_route')(app);
require('./routes/pessoa_route')(app);
// app.use(route_usuario);
//app.use(route_pessoa);



app.listen(3111, () => console.log("Server is running"));
