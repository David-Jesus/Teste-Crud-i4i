const express = require('express');
const cors = require('cors');
const route_pessoa  = require('../src/routes/pessoa_route');
const route_usuario = require('../src/routes/usuario_route');
const verifyToken = require('../src/verifyToken/verifyToken')


const app = express();
app.use(express.json())
app.use(cors());
app.use(route_pessoa);
app.use(route_usuario);
app.use(verifyToken);

app.listen(3111, () => console.log("Server is running"));
