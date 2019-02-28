const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
// const MongoClient = require('mongodb').MongoClient;



// MongoClient.connect(config.DB_URI, (err,client) => {
//     const db = client.db(config.DB_NAME);
// });

const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URI).then(() => {
    const fakeDb = new FakeDb();

    fakeDb.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.nextTick.PORT || 3001;

app.listen(PORT, function () {
    console.log('i am running');
})