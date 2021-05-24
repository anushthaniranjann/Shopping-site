const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/shopping-site";

mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },
    console.log('connected to database')
);