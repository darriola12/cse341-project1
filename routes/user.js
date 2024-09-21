const express = require("express"); 
const route = express.Router(); 
const userController = require("../controllers/user"); 

route.get("/", userController.getAll); 
route.get("/:id", userController.getSingle); 



module.exports = route; 




