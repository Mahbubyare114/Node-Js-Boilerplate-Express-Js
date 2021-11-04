const oracledb = require('oracledb');
const logger = require('../config/logger');
const util = require('../utils/util');
const { ApiError } = require('../payload/ApiError');
const status = require('http-status');

// const host = process.env.DB_HOST,
// const database = process.env.DB_DATABSE,
// const username = process.env.DB_USERNAME,
// const password = process.env.DB_PASSWORD


const host = 'DESKTOP-AQGTCD5:1521';
const database = 'xe';
const username= 'hr';
const password= 'hr';


async function executeQuery(query){
    let connection;
    try{
        oracledb.initOracleClient({libDir: 'D:\\desktop\\TaajTraining\\second training\\Node Db Client\\instantclient_21_3'})
       connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: host + '/' + database
        
        });
       logger.info(`connected to the database`);
    
    //    let result = await connection.execute(`select * from employees`);

      let result = await connection.execute(query);

     
       console.log(result);

       return util.parseDatabaseObject(result);
      // return result;
      
      //  return await connection.execute(query);
       
    }
    
    catch(err){
        console.log(err);
        throw new ApiError (status.INTERNAL_SERVER_ERROR ,"Table or View Does Not Exist!")
      
    
    }finally{
        if(connection){
            await connection.close()
        }
    }
    }

module.exports = {
    executeQuery
}
