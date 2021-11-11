/**
 * This function is For Handling All Async Functions
 */
const handleAsync = (fn) => (req, res, next) => {
    Promise
    .resolve(fn(req, res, next))
    .catch((err) => next(err));
  };
  
  
  const parseDatabaseObject = (data) => {
    if(!data.metaData || !data.rows){
      return data;
  }

  let columns = data.metaData;
  let rows = data.rows;
  let array = [];

  rows.forEach((row, i) => {
      var obj = {};
      columns.map((c, r) => {
          obj[c.name.toLowerCase()] = row[r];
      });
      array.push(obj);
  });
  return array;
};

  
  // parseDatabaseObject();
  
  module.exports = {
    parseDatabaseObject,
    handleAsync,
  };
  