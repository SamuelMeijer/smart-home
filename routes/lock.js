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
        // Evalutes if the correct code is given by the user
        if (reqDevice.code === req.query.code) {
            // Evaluates if the query 'power' exists
            if (req.query.power) {
                // Turning the device 'on' or 'off' depending on the value of 'power'
                switch (req.query.power.toUpperCase()) {
                    case 'ON':
                        db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : true, state : 'locked' }).value();
                        break;
                    case 'OFF':
                        db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : false, state : 'unlocked' }).value();
                        break;
                };
            };

            // Updating frontend
            update();

            // Sending the requested device-object as response
            res.send(reqDevice);
        }
        else {
            // Sending a response letting the user know the provided code was incorrect
            res.status(403).send('Access denied, wrong code!');
        };
    }
    else {
        // Sending a response letting the user know no device with that ID can be found
        res.send(`Cant find a device with that ID`);
    };
});

module.exports = router;