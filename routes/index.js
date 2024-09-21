const express = require("express");
const route = express.Router();  

// route.get("/", (req, res) => {
//     res.send("prueba");
// });

route.use("/users", require("./user"));

module.exports = route;