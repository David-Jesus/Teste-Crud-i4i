const express = require('express');
const cors = require('cors');
const route_pessoa  = require('../routes/pessoa_route');
const route_usuario = require('../routes/usuario_route')


const app = express();
app.use(express.json())
app.use(cors());
app.use(route_pessoa);
app.use(route_usuario);

app.listen(3111, () => console.log("Server is running"));
