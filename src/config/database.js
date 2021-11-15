const oracledb = require('oracledb');
const logger = require('../config/logger');
const util = require('../utils/util');
const { ApiError } = require('../payload/ApiError');
const status = require('http-status');

// Server Oracle db connection with vpn
// const host     = process.env.DB_HOST;
// const database = process.env.DB_DATABSE;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// local db connection setting
const host = 'DESKTOP-AQGTCD5:1521';
const database = 'xe';
const username= 'hr';
const password= 'hr';

oracledb.initOracleClient({libDir: 
  'D:\\desktop\\TaajTraining\\second training\\Node Db Client\\instantclient_21_3'});
  
async function executeQuery(query, params){
    
  /**
  * get connction
  */
 
    let connection;
    try{
       
       connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: host + '/' + database
        
        });
       logger.info(`connected to the database`);
 
  /**
  * execute Query and return result
  */
      let result = await connection.execute(query, params);
      connection.commit();

      
      return util.parseDatabaseObject(result);
       // return result; 
       // console.log(result);
    }
    
  /**
  * throw error if error occurs
  */

    catch(err){
       logger.error(err);
       console.log(`Error from database: ${err}`)
      
      // throw new ApiError (status.INTERNAL_SERVER_ERROR,"Error from database:!")
       return null;
    }finally{
 /**
  * close the connection if it's open
  */
        if(connection){
            await connection.close()
        }
    }
}

module.exports = {
    executeQuery
}
