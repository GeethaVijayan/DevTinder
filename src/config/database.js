const mongoose = require('mongoose');

//connection string availaable in mongodb compass cloud database, we can use that connection string to connect to our cluster in db
/**
 * though we can connect in this way but its not supported . correct way is wrap this connection inside async function
 * mongoose.connect('mongodb+srv://geethavijayan1209_db_user:0YC6HzeogYeF7PLR@namastaenodelearning.28iare7.mongodb.net/')
 */
const connectDB = async function () {
    await mongoose.connect('mongodb+srv://geethavijayan1209_db_user:0YC6HzeogYeF7PLR@namastaenodelearning.28iare7.mongodb.net/devTinder')
}

  
module.exports = connectDB;