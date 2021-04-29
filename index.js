const { app } = require('./core');
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

// TODO: Add paths for:
// AC
// '/api/devices/ac/:id' + query toggle on: true/false, state: 'on'/'off', temperature: 0-99
// BLIND
// '/api/devices/blind/:id' + query toggle on: true/false, state: 'up'/'down'
// CAMERA
// '/api/devices/camera/:id' + query toggle on: true/false, state: 'filming'/'faking', secret: 'UUID'
// LIGHT
// '/api/devices/light/:id' + query toggle on: true/false, color: '#hexa', brightness: 0-1
// LOCK
// '/api/devices/lock/:id' + query toggle locked: true/false, code: 0-9x4, secret: 'UUID' (Hur använda?)
// SPEAKER
// '/api/devices/speaker/:id' + query toggle on:  true/false, state: 'silent'/'playing' TODO: Läs mer om stream.
// VACUUM
// '/api/devices/vacuum/:id' + query toggle on: true/false, state: 'cleaning', 'charging', 'off'

// TEST
app.get('/api/devices/ac/:id', (req, res) => {
    // Finding the requested device
    const reqDevices = db.get('devices').find({ id : req.params.id }).value();

    if (reqDevices) {
        // Turning on the requested device
        db.get('devices').find({ id : req.params.id }).assign({ on : true, state : 'on' }).value();
        // Updating the frontend
        update();
        // Sending response
        res.send(`${req.params.id} turned on`);
    }
    else {
        res.send('Cant find device');
    };
});

// TODO: ADD ERROR HANDLING/RESPONSE IF REQUEST IS SENT TO A PATH THAT DOES NOT EXIST
/*
app.get('*', (req, res) => {

})
*/