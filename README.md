
1. Introduction
   This app is a boilerplate

2. Project Structure
- src
  - config (db & logger)
  - controller
  - locales (i18n multi-lang json files)
  - logs
  - middlewares
  - model
  - payload
  - routes
  - service
  - utils
  - validations
  - index file (main)
  - .env config

3. Libraries (dependencies): 
- body-parser -> Parse incoming request bodies in a middleware before your handlers (req.body)
- cookie-Parser -> Parse HTTP request cookies
- Cors -> Cross Origin resource sharing
- dotenv -> Loads environment variables from .env file
- express -> Fast, unopinionated, minimalist web framework
- helmet -> determine the header in express
- http-status -> Utility to interact with HTTP status codes.
- i18n -> multi-language suport (Lightweight translation module with dynamic json storage)
- joi -> The most powerful schema description language and data validator for JavaScript.
- jsonwebtoken -> JSON Web Token implementation (symmetric and asymmetric)
- morgan -> To Log API Calls
- node-cache -> internal caching
- oracledb -> A Node.js module for Oracle Database access
- winston -> use for logging purposes

4. Database -> OracleDB
- authenticating the user
- Connecting to oracleDB
- authorizing user with some/all permissions
- Executing Some Queries
- Retreiving Data from oracle
- Closing the Connection




