var db = require('./db')

class DbManager {

    constructor() {
    }

    query(sql) {
        return new Promise(function (resolve, reject) {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(`${sql} failed:${err}`)
                } else {
                    resolve(rows)
                }
            })
        });
    }

    insert(sql, queryParams) {
        return new Promise(function (resolve, reject) {
            db.run(sql, queryParams, function (err) {   
                if (err) {
                    reject(`${sql} failed:${err}`)
                } else {
                    resolve([{
                        id: this.lastID
                    }])
                }
            })
        });
    }

    update(sql, queryParams) {
        return new Promise(function (resolve, reject) {
            db.run(sql, queryParams, function (err) {
                if (err) {
                    reject(`${sql} failed:${err}`)
                } else {
                    resolve([])
                }
            })
        });
    }

    closeDb() {
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

}
module.exports = new DbManager()
