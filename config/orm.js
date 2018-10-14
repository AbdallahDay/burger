const connection = require('./connection');

function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
    arr.push("?");
    }

    return arr.toString();
};

function executeQuery(queryString, callback) {
    console.log(queryString);

    connection.query(queryString, (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

function executeQuery(queryString, vals, callback) {
    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
};

const orm = {
    all: (table, callback) => {
        let queryString = `SELECT * FROM ${table};`;
        
        executeQuery(queryString, callback);
    },
    create: (table, cols, vals, callback) => {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;

        executeQuery(queryString, vals, callback);
    },
    update: (table, objColVals, condition, callback) => {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        executeQuery(queryString, callback);
    }
};

module.exports = orm;