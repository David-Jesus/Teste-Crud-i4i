const express = require('express');
const router  = require('./routes')


const app = express();
app.use(router);

app.listen(3111, () => console.log("Server is running"));
