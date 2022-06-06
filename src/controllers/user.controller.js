const assert = require("assert");
const { title } = require("process");
let database = [];
let id =0;

let controller = {
    validateUser: (req,res,next)=> {
        let user = req.body;
        let { firstName, lastName, street, city, password, emailAdress, phoneNumber } = user;
        
        try {
            assert(typeof firstName == 'string', "firstname must be string");
            assert(typeof lastName == 'string', "lastname must be string");
            assert(typeof street == 'string', "street must be string");
            assert(typeof city == 'string', "city must be string");
            assert(typeof password == 'string', "password must be string");
            assert(typeof emailAdress == 'email', "emailAdress must be correct");
            assert(typeof phoneNumber == 'number', "phonenumber must be numeric");
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).json({
                status: 400,
                result: `${err.toString()}`,
            });
        }

    },
    addUser: (req,res)=>{
        let user = req.body;
        id++;
  
        user = {
        id,
        ...user,
        };
        console.log(user);
        database.push(user);
        res.status(201).json({
        status: 201,
        result: database,
        });
    },
    getAllUsers: (req,res)=>{
        res.status(200).json({
            status:200,
            result: database,
        });
    },
    getUserProfile: (req,res)=>{
        response.send(database[0]);
        console.log(database[0]);
    },
    getUserById:(req,res)=>{
        const userId = req.params.userId;
        console.log(`User met Id ${userId} gezocht`);
        let user = database.filter((item) => item.id == userId);
        if (user.length > 0) {
        console.log(user);
        res.status(200).json({
            status: 200,
            result: user,
        });
        }
        else {
        res.status(401).json({
            status: 401,
            result: `User with ID ${userId} not found`,
        });
        }
    },
    updateAnUserById: (req,res)=>{
        const userId = req.params.userId;
        database = database.map( u=> {
        if (u.id == userId)
        {
                const user = req.body;
    
                return {...u,...user}
        }
        return u
        })
        res.status(200).json({
            massage:"User updated"
        })
    },
    deleteAnUserByID:(req,res)=>{
        const userId = req.params.userId;
        database = database.filter(u => u.id != userId);
    
        res.status(200).json({
            message:"user deleted"
        });
    }
}

module.exports = controller;