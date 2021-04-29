const { app } = require('./core');
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

// TODO: Add paths for:
// CAMERA
// '/api/devices/camera/:id' + query power on: true/false, state: 'filming'/'faking', secret: 'UUID'
// LIGHT // ID=ALL
// '/api/devices/light/:id' + query power on: true/false, color: '#hexa', brightness: 0-1
// LOCK
// '/api/devices/lock/:id' + query power locked: true/false, code: 0-9x4, secret: 'UUID' (Hur använda?)
// SPEAKER
// '/api/devices/speaker/:id' + power toggle on:  true/false, state: 'silent'/'playing' TODO: Läs mer om stream.
// VACUUM
// '/api/devices/vacuum/:id' + power toggle on: true/false, state: 'cleaning', 'charging', 'off'

/* AC 
Path: /api/decivces/ac/:id
Queries: power=VALUE (on/off) , temperature=VALUE (0-50)
*/
app.get('/api/devices/ac/:id', (req, res) => {
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

        // Evaluates if the query 'temperature' exists and has a value between 0 and 50
        if (req.query.temperature && Number(req.query.temperature) >= 0 && Number(req.query.temperature <= 50)) {
            // Setting the device to have the desired temperature
            db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ temperature : Number(req.query.temperature) }).value();
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

/* BLIND 
Path: /api/decivces/blind/:id
Queries: power=VALUE (on/off)
*/
app.get('/api/devices/blind/:id', (req, res) => {
    // Evaluate if a device with the requested id exists
    const reqDevice = db.get('devices').find({ id : req.params.id.toUpperCase() }).value();

    if (reqDevice) {
        // Evaluates if the query 'power' exists
        if (req.query.power) {
            // Turning the device 'on' or 'off' depending on the value of 'power'
            switch (req.query.power.toUpperCase()) {
                case 'ON':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : true, state : 'down' }).value();
                    break;
                case 'OFF':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : false, state : 'up' }).value();
                    break;
            };
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

// TODO: ADD ERROR HANDLING/RESPONSE IF REQUEST IS SENT TO A PATH THAT DOES NOT EXIST
/*
app.get('*', (req, res) => {

})
*/