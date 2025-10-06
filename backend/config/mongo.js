const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/node1')
    .then(() => { console.log("connected to mongodb") })
    .catch(() => { console.log("error connecting to mongodb") });

