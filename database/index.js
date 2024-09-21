const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log("DB ya estaba inicializada");
        return callback(null, database);
    }

    MongoClient.connect(process.env.DATABASE_URL)
        .then((client) => {
            database = client.db("User"); 
            console.log("Conectado a MongoDB");
            callback(null, database);
        })
        .catch((err) => {
            console.error("Fallo al conectar a MongoDB:", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Base de datos no inicializada. Llama a initDb primero.");
    }
    return database; 
};

module.exports = { initDb, getDatabase };
