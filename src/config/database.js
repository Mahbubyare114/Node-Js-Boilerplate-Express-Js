const oracledb = require('oracledb');

const host = '15.15.0.59:1521';
const database = 'students';
const username = 'abdikadir';
const password = 'abdikadir';

async function checkConnection(){
let connection;
try{
    oracledb.initOracleClient({libDir: 'D:\\desktop\\TaajTraining\\second training\\Node Db Client\\instantclient_21_3'})
   connection = await oracledb.getConnection({
        user: username,
        password: password,
        connectString: host + '/' + database
    
    });
    console.log(`connected to database`);
    let result = await connection.execute(`select * from employee`);
    console.log(result);
    connection.close()
   
}

catch(err){
    console.log(err);

}
}


checkConnection();
  


