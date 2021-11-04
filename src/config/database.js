const oracledb = require('oracledb');
const logger = require('../config/logger');
const util = require('../utils/util');
const { ApiError } = require('../payload/ApiError');
const status = require('http-status');

// Server Oracle db connection with vpn
const host     = process.env.DB_HOST;
const database = process.env.DB_DATABSE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// local db connection setting
// const host = 'DESKTOP-AQGTCD5:1521';
// const database = 'xe';
// const username= 'hr';
// const password= 'hr';


async function executeQuery(query){
    
  /**
  * get connction
  */
 
    let connection;
    try{
        oracledb.initOracleClient({libDir: 'D:\\desktop\\TaajTraining\\second training\\Node Db Client\\instantclient_21_3'})
       connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: host + '/' + database
        
        });
       logger.info(`connected to the database`);
 
  /**
  * execute Query and return result
  */
      let result = await connection.execute(query);

      return util.parseDatabaseObject(result);
       // console.log(result);
    }
    
  /**
  * throw error if error occurs
  */

    catch(err){
       logger.error(err);
        throw new ApiError (status.INTERNAL_SERVER_ERROR,"Table or View Does Not Exist!")
      
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
