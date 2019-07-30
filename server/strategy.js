var express = require('express')
var router = express.Router()
var db = require('./dbManager')

router.get('/', function (req, res) {
    let { start, limit } = req.query;
    if (limit == undefined || limit === "")
        limit = -1;
    if (start == undefined || start === "")
        start = 0;

    const sql = `SELECT * FROM  Strategy LEFT JOIN (`
        + ` SELECT strategyId,Sum((price - buyPrice) * count) As income, ((Sum(price - buyPrice) * 1.0)/Sum(buyPrice)) * 100  as incomePrc  FROM Portfolio`
        + ` LEFT JOIN Stocks ON  Portfolio.stockId = Stocks.id`
        + ` Group By strategyId) AS StockView`
        + `  ON id = StockView.strategyId LIMIT ${limit} OFFSET ${start}`;
        


    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.post('/', function (req, res) {
    const { name } = req.body;
    const sql = `INSERT INTO Strategy (NAME) VALUES (?)`;
    db.insert(sql, [name]).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.delete('/:strategyId', function (req, res) {
    const { strategyId } = req.params;
    const sql = `DELETE FROM Strategy WHERE id=${strategyId}`;
    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.put('/:strategyId', function (req, res) {
    const { strategyId } = req.params;
    let s = [];
    let queryParams = []
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key) && key !== "id") {
            s.push(`${key}=?`);
            queryParams.push(req.body[key]);
        }
    }

    const sql = `UPDATE Strategy SET ${s.join(',')} WHERE id=${strategyId}`;

    db.update(sql, queryParams).then(function (row) {
       // res.send(row)
       getItem(res,strategyId);
    }).catch(function (err) {
        res.status(500).send(err);
    });
})


router.get('/:strategyId', function (req, res) {

    let { strategyId } = req.params;
    getItem(res,strategyId);
    /*const sql = `SELECT * FROM Strategy WHERE id=${strategyId}`;

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });*/
})

function getItem(res, strategyId) {
    const sql = `SELECT * FROM  Strategy LEFT JOIN (`
    + ` SELECT strategyId,Sum((price - buyPrice) * count) As income, ((Sum(price - buyPrice) * 1.0)/Sum(buyPrice)) * 100  as incomePrc  FROM Portfolio`
    + ` LEFT JOIN Stocks ON  Portfolio.stockId = Stocks.id`
    + ` Group By strategyId) AS StockView`
    + `  ON id = StockView.strategyId WHERE id = ${strategyId}`;
    

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
}


module.exports = router