const dotenv = require("dotenv");
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'});
const cookieParser = require('cookie-parser');
require("./db/conn");
app.use(express.json());
app.use(cookieParser());
const bodyParser = require('body-parser');
const routes = require('./routes');


app.use(bodyParser.json());

// Use the defined routes
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
