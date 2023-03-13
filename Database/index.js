const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://gunner_arg:aaabbb@cluster0.wkrinem.mongodb.net/database1';

const db = async () => {
    await mongoose
        .connect(MONGO_URL)
        .then(() => console.log('DB FUNCIONANDO'))
        .catch((error) => console.error(error));
};

module.exports = db

//mongodb+srv://gunner_arg:aaabbb@cluster0.wkrinem.mongodb.net/?retryWrites=true&w=majority

//mongodb://gunner_arg:1@cluster0.wkrinem.mongodb.net/database1