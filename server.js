const express = require("express"); 
const app = express(); 
const route = require("./routes/index");

const mongoDb = require("./database/index")

app.use("/", route)


mongoDb.initDb((err) =>{
    if(err){
        console.log(err)
    }
    else{
        const PORT = process.env.PORT || 3000; 

        app.listen(PORT, () =>{
            console.log("web is desing on " + PORT);
        })
        
        
    }
})

