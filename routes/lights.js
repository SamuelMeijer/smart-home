// Setting up Router
const { Router } = require('express');
const router = new Router;
// Importing database
const { db, update } = require('../db');

router.get('/', (req, res) => {
    res.send('Please enter a valid device-ID');
});

router.get('/:id', (req, res) => {
    // Evaluate if a device with the requested id exists
    const reqDevice = db.get('devices').find({ id : req.params.id.toUpperCase() }).value();

    if (reqDevice) {
        // Evaluates if the query 'power' exists
        if (req.query.power) {
            // Turning the device 'on' or 'off' depending on the value of 'power'
            switch (req.query.power.toUpperCase()) {
                case 'ON':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : true, state : 'on' }).value();
                    break;
                case 'OFF':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : false, state : 'off' }).value();
                    break;
            };
        };

        // Evaluates if the query 'color' exists and has a value that is 3 or 6 characters long
        if (req.query.color && req.query.color.length === 3 || req.query.color && req.query.color.length === 6) {
            // Setting the device to have the desired color
            db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ color : `#${req.query.color}` }).value();
        };
        
        // Evaluates if the query 'brightness' exists and has a value that is between 0 and 1
        if (req.query.brightness && Number(req.query.brightness) >= 0 && Number(req.query.brightness) <= 1) {
            // Setting the device to have the desired brightness
            db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ brightness : Number(req.query.brightness) }).value();
        };

        // Updating frontend
        update();

        // Sending the requested device-object as response
        res.send(reqDevice);
    }
    else {
        // Sending a response letting the user know no device with that ID can be found
        res.send(`Cant find a device with that ID`);
    };
});

module.exports = router;