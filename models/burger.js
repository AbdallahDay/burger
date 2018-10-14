const orm = require('../config/orm');

const tableName = "burgers";

const burger = {
    all: (callback) => {
        orm.all(tableName, (res) => callback(res));
    },
    create: (cols, vals, callback) => {
        orm.create(tableName, cols, vals, (res) => callback(res));
    },
    update: (objColVals, condition, callback) => {
        orm.update(tableName, objColVals, condition, (res) => callback(res));
    }
};

module.exports = burger;