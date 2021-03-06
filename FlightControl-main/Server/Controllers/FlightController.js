const express = require('express');
const router = express.Router();
const Logic = require('../Logic/flightControl');
const Data = require("../Logic/FlightsData");
const Flight = require('../Logic/Models/Flight');
const db = require('../LogDb/DB');
//קבלת הטיסות מהסימולטור
router.post('/flight', (req, res) => {
    //add to the flights collection in the correct place(arrival or departure)
    const currentFlight = new Flight(req.body.brand, req.body.number, req.body.isCritical, req.body.isDeparture);
    //אם פרטי הטיסה ריקים
    if (!currentFlight || !currentFlight.name) {
        res.send("Flight did not receive landing or departure approval, due to missing flight information");
        return;
    }
    //אם פרטי הטיסה מלאים
    else {
        //אם זה המראה
        if (currentFlight.isDeparture) {
            if (Data.departureProcess[0].flights.length > 100) {
                res("Departure was delayed due to heavy traffic at the airport");
                return;
            }
            //מכניס לפונקציית ההמראה
            Logic.registerDepartureFlight(currentFlight);
        }
        //אם זה לא המראה
        //if landing try to put in leg1, if cant put in incoming flights.
        else {
            if (Data.landingProcess[0].flights.length > 100 && !currentFlight.isCritical) {
                res("Flight was redirected to another airport due to heavy traffic at the air port");
                return;
            }
            //מכניס לפונקציית הנחיתה
            Logic.registerArrivalFlight(currentFlight);
        }
    }
    res.send("ok");
});

//מקבל את הנתונים מהדאטה בייס
//קבלת הפרטים של כל הטיסות, לצורך תפיסתן ורישומן בהמשך על המסך
router.get('/log', (req, res) => {
    let data;
    db.all(`SELECT * FROM LogEntries`, (err, rows) => {
        if (err) {
            res.status(500).contentType('application/json').json({ "error": err.message });
            return;
        }
        else {
            res.status(200).contentType('application/json').json(rows);
        }
    })
})


module.exports = router;

