const express = require('express');
const router  = require('./routes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(router);

app.listen(3111, () => console.log("Server is running"));
