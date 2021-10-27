require('dotenv').config()
const { config } = require('dotenv');
const express = require('express');
const logger = require('./config/logger');
const morganMiddleware = require('./middlewares/morgan');
const { ApiError } = require('./payload/ApiError');
const { required } = require('joi');
const { error } = require('winston');
const httpStatus = require('http-status');
const helmet = require("helmet");  // determine the header in express
const cors = require('cors');  // cross origin resourse sharing

const app = express();
const BaseURL = process.env.BaseURL;
const port = process.env.port;


/**
 * Middlewares
 */

app.use(express.json());
app.use(morganMiddleware); // use morgan middlleware in a seperate file
app.use(cors);    // enabling CORS for all request
//app.use(helmet);  // adding Helmet to enhance your API's Security

/**
 * Router Middleware
 */

const routeCatalog = require('./routes/v1/index');

app.use(process.env.API_VERSION, routeCatalog);




// All Unknown API Error Handling
app.use((req, res , next) => {
  let status = httpStatus.NOT_FOUND;
  let error ='Api Not Found';
  
res.status(status).send(new ApiError(status, error));
});

// All The Exceptions Error Handling (Custom Error Middleware)
app.use((err, req, res, next) => {
  res.status(err.status).send(err);
})


app.listen(port, () =>{
  logger.info(`app is listening on port ${BaseURL}:${port}`);
}); 

