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


const createUser = async (req, res) =>{

    const user = {

        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email, 
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday

    }; 

    try {
        const response = await mongoDb.getDatabase().collection("Users").insertOne(user);

        if (response.acknowledged) {
            res.status(201).json(response.ops[0]); // Devuelve el usuario creado
        } else {
            res.status(500).json({ error: "Some error occurred while inserting data" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || "Some error occurred" });
    }
}

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const newUser = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email, 
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday
    };

    try {
        const response = await mongoDb.getDatabase().collection("Users").replaceOne(
            { _id: userId },
            newUser
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully", userId });
        } else {
            res.status(404).json({ error: "User not found or no changes made" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || "Some error occurred" });
    }
};


const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id); 

    try {
        const response = await mongoDb.getDatabase().collection("Users").deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully", userId });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || "Some error occurred" });
    }
};




module.exports = { getAll, getSingle, createUser, updateUser, deleteUser};
