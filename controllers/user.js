const mongoDb = require("../database/index"); 
const { ObjectId } = require("mongodb"); 

const getAll = async (req, res) => {
    try {
        const users = await mongoDb.getDatabase().collection("Users").find().toArray(); 
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongoDb.getDatabase().collection("Users").findOne({ _id: userId }); 
        if (!user) {
            return res.status(404).json({ message: "not user found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "intern server error" });
    }
};

module.exports = { getAll, getSingle };
