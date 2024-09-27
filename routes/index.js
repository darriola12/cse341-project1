const route = require("express").Router(); 

route.use("/", require("./swagger")); 

route.get("/", (req, res) => {
    //#swagger.tags={"Hello world"}
    res.send("Hello World");
});

route.use("/users", require("./user"));

module.exports = route;