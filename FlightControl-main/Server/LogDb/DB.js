const sql = require('sqlite3');
const fs = require('fs');
const dbName = "FlightLog.db";
const mainDir = __dirname.slice(0, __dirname.length - 5);
//יצירת מיקום באסקיולייט
let db = new sql.Database(dbName, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('Db connected');
    }
})

//הרצת הפונקצייה של שורה 36 של היצירה
createDb();

function checkDbExists() {
    if (fs.existsSync(mainDir + dbName) == false) {
        return false;
    }
    return true;
}
//מייצר את הטבלה
function createLogEntriesTable() {
    db.run(`CREATE TABLE LogEntries (
                Id INTEGER NOT NULL PRIMARY KEY,
                Flight nvarcher(25) NOT NULL,
                isDeparture boolean NOT NULL,
                Content nvarchar(100) NOT NULL,
                Timestamp text NOT NULL);`
    )
}
//בודק אם קיימת כבר טבלה ואם לא אז מריץ את פונקציית היצירה
function createDb() {
    if (!checkDbExists()) {
        createLogEntriesTable()
        console.log("Table created");
    }
}

module.exports = db;