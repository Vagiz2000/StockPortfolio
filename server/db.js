var sqlite3 = require('sqlite3').verbose();



let db = new sqlite3.Database("db/portfolio.db",
   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
   (err) => {
      if (err) {
         console.log(err.message);
         return;
      }
      console.log("Database created/opened");
   });

let exists = false;
db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='Stocks'", (err, rows) => {
   exists = (rows.length === 1);
   if (!exists) {
      db.serialize(() => {
         db.run("create table if not exists Stocks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,ticker TEXT NOT NULL,price DECIMAL,UNIQUE(name),UNIQUE(ticker))");
         db.run("INSERT INTO Stocks (id,name,ticker,price) Values(1,'Лукойл','LKOH',5075)");
         db.run("INSERT INTO Stocks (id,name,ticker,price) Values(2,'Детский мир','DSKY',89.50)");
         db.run("INSERT INTO Stocks (id,name,ticker,price) Values(3,'Газпром','GAZP',234.23)");
         db.run("INSERT INTO Stocks (id,name,ticker,price) Values(4,'Сбербанк','SBER',230.55)");

         db.run("create table if not exists Strategy (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,UNIQUE(name))");
         db.run("INSERT INTO Strategy (id,name) Values(1,'Инвестиционная')");
         db.run("INSERT INTO Strategy (id,name) Values(2,'Экспортеры')");
         db.run("INSERT INTO Strategy (id,name) Values(3,'Кризисная')");

         db.run("create table if not exists Portfolio (id INTEGER PRIMARY KEY AUTOINCREMENT, stockId INTEGER NOT NULL,strategyId INTEGER NOT NULL,count INTEGER NOT NULL, buyPrice DECIMAL NOT NULL," +
            "FOREIGN KEY (stockId) REFERENCES Stocks (id) ON DELETE CASCADE ON UPDATE NO ACTION,FOREIGN KEY (strategyId) REFERENCES Strategy (id) ON DELETE CASCADE ON UPDATE NO ACTION)",() => {
               db.run("INSERT INTO Portfolio (stockId,strategyId,count,buyPrice) Values(1,2,200,4859)");
               db.run("INSERT INTO Portfolio (stockId,strategyId,count,buyPrice) Values(1,2,250,4791)");
               db.run("INSERT INTO Portfolio (stockId,strategyId,count,buyPrice) Values(2,1,100,84.38)");
               db.run("INSERT INTO Portfolio (stockId,strategyId,count,buyPrice) Values(3,2,300,186.00)");
               db.run("INSERT INTO Portfolio (stockId,strategyId,count,buyPrice) Values(4,1,80,225.34)");
            });
      })
   }
   db.run("PRAGMA foreign_keys = ON"); //tell sqllite to use foreign keys
})

module.exports = db