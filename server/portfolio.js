var express = require('express')
var router = express.Router()
var db = require('./dbManager')

router.use(function timeLog(req, res, next) {
    next()
})

router.get('/', function (req, res) {
    let { start, limit } = req.query;
    if (limit == undefined || limit === "")
        limit = -1;
    if (start == undefined || start === "")
        start = 0;

    const sql = `SELECT Portfolio.id as id,count,stockId,Stocks.name as stockName,strategyId,Strategy.name as strategyName,buyPrice FROM Portfolio LEFT JOIN Stocks ON stockId = Stocks.id LEFT JOIN Strategy ON strategyId = Strategy.id LIMIT ${limit} OFFSET ${start}`;

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });

})

router.post('/', function (req, res) {
    const { count, stockId, buyPrice,strategyId } = req.body;

    const sql = `INSERT INTO Portfolio (count,stockId,buyPrice,strategyId) VALUES (?,?,?,?)`;
    db.insert(sql, [count, stockId, buyPrice,strategyId]).then(function (rows) {
        getItem(res, rows[0].id);
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.delete('/:portfolioId', function (req, res) {
    const { portfolioId } = req.params;
    const sql = `DELETE FROM Portfolio WHERE id=${portfolioId}`;
    db.query(sql).then(function (rows) {
        res.send(rows);
    }).catch(function (err) {
        res.status(500).send(err);
    });
})

router.put('/:portfolioId', function (req, res) {
    const { portfolioId } = req.params;
    let s = [];
    let queryParams = []
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key) && key !== "id") {
            s.push(`${key}=?`);
            queryParams.push(req.body[key]);
        }
    }

    const sql = `UPDATE Portfolio SET ${s.join(',')} WHERE id=${portfolioId}`;

    db.update(sql, queryParams).then(function (row) {
        getItem(res, portfolioId)
    }).catch(function (err) {
        res.status(500).send(err);
    });
})


router.get('/:portfolioId', function (req, res) {

    const { portfolioId } = req.params;
    getItem(res, portfolioId);
    /*//const sql = `SELECT * FROM Portfolio WHERE id=${portfolioId}`; 
    const sql = `SELECT Portfolio.id as id,count,stockId,name FROM PortfolioLEFT JOIN Stocks ON stockId = Stocks.id WHERE Portfolio.id=${portfolioId}`;   

    db.query(sql).then(function(rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    }); */
})


function getItem(res, portfolioId) {
    const sql = `SELECT Portfolio.id as id,count,stockId,Stocks.name as stockName,strategyId,Strategy.name as strategyName,buyPrice FROM Portfolio LEFT JOIN Stocks ON stockId = Stocks.id LEFT JOIN Strategy ON strategyId = Strategy.id WHERE Portfolio.id=${portfolioId}`;

    db.query(sql).then(function (rows) {
        res.send(rows)
    }).catch(function (err) {
        res.status(500).send(err);
    });
}

module.exports = router