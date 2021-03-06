require('dotenv').config(); // dotenv package import
const { config } = require('dotenv');
const express = require('express');
const logger = require('./config/logger');
const { morganLogger } = require('./middlewares'); // require morganLogger middleware
const { ApiError } = require('./payload/ApiError');
const httpStatus = require('http-status');
const cors = require('cors');       // cross origin resourse sharing
const helmet = require('helmet');  // determine the header in express
const i18n = require('i18n');     // to support multi-language
const cookieParser = require('cookie-parser');  //to get cookies data

const app = express();
const BASE_URL = process.env.BASE_URL;
const port = process.env.PORT;


/**
 * Locale Configuration
 */
 i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en','ar','so'],

    // set default locale
    defaultLocale: 'en',
 
  // sets a custom cookie name to parse locale settings from
  cookie: 'currentLocale',

  // will return translation from defaultLocale in case current locale doesn't provide it
  retryInDefaultLocale: false,

   // sets a custom header name to read the language preference from - accept-language header by default
   header: 'our-accepted-language',
 
  
  // watch for changes in JSON files to reload locale on updates - defaults to false
  autoReload: true,

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});

/**
 * Middlewares
 */

app.use(express.json());
app.use(morganLogger); // use morganLogger middlleware in a seperate file

app.use(cors());    // enabling CORS for all request
app.use(helmet());  // adding Helmet to enhance your API's Security
app.use(cookieParser());  // cookieParser to expose cookies to req.cookies
app.use(i18n.init);  // i18n init parses req for language headers, cookies, etc.
  


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

// All The Exceptions Error Handling (Custom Error or System Error Middleware)
// app.use((err, req, res, next) => {
//   res.status(err.status).send(err);
//   next(err);
// });

// All The Exceptions Error Handling (Custom Error and System Error Middleware)
app.use((err, req, res, next)=> {
  let status = err.status || 500; // status code

  let errors = [
    { status: 500, description: "Internal Server Error" }, // syste error
    { status: 400, description: "Bad Request" }, // custom error
  ].filter((err) => err.status == status);
  let desc = errors.length ? errors[0].description : 0;
  let error = (!desc ? 0 : new ApiError(status, desc)) || err;
  console.error(err);
  res.status(status).send(error);
});


app.listen(port, () =>{
  logger.info(`app is listening on port ${BASE_URL}:${port}`);
}); 

