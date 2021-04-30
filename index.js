const { app } = require('./core');
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

//IMPORTING ROUTES
const ac = require('./routes/ac');
const blind = require('./routes/blind');
const camera = require('./routes/camera');
const lights = require('./routes/lights');
const lock = require('./routes/lock');
const speakers = require('./routes/speakers');
const vacuum = require('./routes/vacuum');

// DEVICES
/* 
    AC 
    Path: /api/devices/ac/:id
    Queries: power=VALUE (on/off)
             temperature=VALUE (0-50)
*/
app.use('/api/devices/ac', ac);


/* 
    BLIND 
    Path: /api/devices/blind/:id
    Queries: power=VALUE (on/off)
*/
app.use('/api/devices/blind', blind);


/* 
    CAMERA 
    Path: /api/devices/camera/:id
    Queries: power=VALUE (on/off)
             secret=VALUE ('UUID')
    TODO: Currently not using secret.
*/
app.use('/api/devices/camera', camera);


/* 
    LIGHTS 
    Path: /api/devices/lights/:id
    Queries: power=VALUE (on/off)
             color=VALUE (hexadecimal color code without #)
             brightness=VALUE (0-1)
*/
app.use('/api/devices/lights', lights);


/* 
    LOCK
    Path: /api/devices/lock/:id
    Queries: power=VALUE (on/off)
             code=VALUE (four digits with the value 0-9)
             secret=VALUE ('UUID')
    TODO: Currently not using secret.
*/
app.use('/api/devices/lock', lock);


/* 
    SPEAKERS
    Path: /api/devices/speakers/:id
    Queries: power=VALUE (on/off)

    // TODO: Make streaming work. 
    "The audio object is looking for readableStream at the following endpoint: /speakers/:id/stream"
*/
app.use('/api/devices/speakers', speakers);


/* 
    VACUUM
    Path: /api/devices/vacuum/:id
    Queries: power=VALUE (on/off/charging)
*/
app.use('/api/devices/vacuum', vacuum);


// Catching all other paths
app.get('*', (req, res) => {
    res.status(404).send(`404 - No path with url ${req.url} can be found!`);
});