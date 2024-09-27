const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoDb = require("./database/index");

// Middleware para analizar el cuerpo de las peticiones
app.use(bodyParser.json());

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    
    // Manejar las solicitudes OPTIONS
    if (req.method === "OPTIONS") {
        return res.sendStatus(204); // No Content
    }
    
    next();
});

// Rutas
app.use("/", require("./routes"));

// Inicializar la base de datos y el servidor
mongoDb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log("Server is running on " + PORT);
        });
    }
});