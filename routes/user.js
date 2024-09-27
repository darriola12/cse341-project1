const express = require("express"); 
const route = express.Router(); 
const userController = require("../controllers/user"); 

route.get("/", userController.getAll); 

route.get("/:id", userController.getSingle); 

route.post("/", userController.createUser); 

route.put("/:id", userController.updateUser); 

route.delete("/:id", userController.deleteUser); 





module.exports = route; 




