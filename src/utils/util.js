
const handleAsync = (fn) => (req, res, next) => {
    Promise
    .resolve(fn(req, res, next))
    .catch((err) => next(err));
  };
  
  
  const parseDatabaseObject = (data) => {
    let coloums = data.metaData;
    let rows = data.rows;
    let array = [];
  
    rows.forEach((row, i) => {
    var obj = {};
      coloums.map((r, c) => {
        obj[r.name] = row[c];
      });
      array.push(obj);
    });
   // console.log(array);
  
    return array;
  };
  
  // parseDatabaseObject();
  
  module.exports = {
    parseDatabaseObject,
    handleAsync,
  };
  