const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/surveys'
const db = mongoose.connection

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



db.once('open', _ => console.log('db conected in', URI))

db.on('error', err => console.log('ALERTA', err))