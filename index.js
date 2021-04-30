const { app } = require('./core');
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

// TODO: Add statuscode for responses

// TODO: Add paths for:
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

/* CAMERA 
Path: /api/decivces/camera/:id
Queries: power=VALUE (on/off) , secret=VALUE ('UUID')
TODO: Currently not using secret.
*/
app.get('/api/devices/camera/:id', (req, res) => {
    // Evaluate if a device with the requested id exists
    const reqDevice = db.get('devices').find({ id : req.params.id.toUpperCase() }).value();

    if (reqDevice) {
        // Evaluates if the query 'power' exists
        if (req.query.power) {
            // Turning the device 'on' or 'off' depending on the value of 'power'
            switch (req.query.power.toUpperCase()) {
                case 'ON':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : true, state : 'filming' }).value();
                    break;
                case 'OFF':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : false, state : 'faking' }).value();
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

/* LIGHTS 
Path: /api/decivces/light/:id
Queries: power=VALUE (on/off) , color=VALUE ('colorcode') , brightness=VALUE (0-1)
*/
app.get('/api/devices/light/:id', (req, res) => {
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

/* LOCK
Path: /api/decivces/lock/:id
Queries: power=VALUE (on/off) , code=VALUE (four digits 0-9), secret=VALUE ('UUID')
TODO: Currently not using secret.
*/
app.get('/api/devices/lock/:id', (req, res) => {
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
            res.send('Access denied, wrong code!');
        };
    }
    else {
        // Sending a response letting the user know no device with that ID can be found
        res.send(`Cant find a device with that ID`);
    };
});

/* SPEAKER
Path: /api/decivces/speakers/:id
Queries: power=VALUE (on/off)

// TODO: Make streaming work. "The audio object is looking for readableStream at the following endpoint: /speakers/:id/stream"
*/
app.get('/api/devices/speakers/:id', (req, res) => {
    // Evaluate if a device with the requested id exists
    const reqDevice = db.get('devices').find({ id : req.params.id.toUpperCase() }).value();

    if (reqDevice) {
        // Evaluates if the query 'power' exists
        if (req.query.power) {
            // Turning the device 'on' or 'off' depending on the value of 'power'
            switch (req.query.power.toUpperCase()) {
                case 'ON':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : true, state : 'playing' }).value();
                    break;
                case 'OFF':
                    db.get('devices').find({ id : req.params.id.toUpperCase() }).assign({ on : false, state : 'silent' }).value();
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