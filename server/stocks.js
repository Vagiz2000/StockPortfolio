var express = require('express')
var router = express.Router()
var db = require('./dbManager')

router.get('/', function (req, res) {
    let { start, limit } = req.query;
    if (limit == undefined || limit === "")
        limit = -1;
    if (start == undefined || start === "")
        start = 0;

    const sql = `SELECT * FROM Stocks LIMIT ${limit} OFFSET ${start}`;

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.post('/', function (req, res) {
    const { name, ticker, price } = req.body;
    const sql = `INSERT INTO Stocks (NAME,TICKER,PRICE) VALUES (?,?,?)`;
    db.insert(sql, [name, ticker, price]).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.delete('/:stockId', function (req, res) {
    const { stockId } = req.params;
    const sql = `DELETE FROM Stocks WHERE id=${stockId}`;
    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.put('/:stockId', function (req, res) {
    const { stockId } = req.params;
    let s = [];
    let queryParams = []
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key) && key !== "id") {
            s.push(`${key}=?`);
            queryParams.push(req.body[key]);
        }
    }

    const sql = `UPDATE Stocks SET ${s.join(',')} WHERE id=${stockId}`;

    db.update(sql, queryParams).then(function (row) {
        res.send(row)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})


router.get('/:stockId', function (req, res) {

    const { stockId } = req.params;
    const sql = `SELECT * FROM Stocks WHERE id=${stockId}`;

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

module.exports = router