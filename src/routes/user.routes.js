const express = require("express");
const router = express.Router();


let database = [];
let id =0;

router.get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      result: "Step on the moon"
    });
  }); // returns step on the moon as first result on requsting localhost
  
  
  
  router.post("/api/user", (req, res) =>{
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
  }); // UC-201 register a new user 
  
  router.get("/api/user", (req, res) => {
    res.status(200).json({
      status:200,
      result: database,
    });
  }) // UC-202 get all users 
  
  router.get('/api/user/profile', (request, response) => {
    response.send(database[0]);
    console.log(database[0]);
  }); // UC-203 get personal user profile
  
  
  router.get("/api/user/:userId", (req, res) => {
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
  }); // UC-204 get a specific user using their Id
  
  
  router.put("/api/user/:userId", (req, res) => {
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
  }); // UC-205 update an user using their Id
  
  
  router.delete("/api/user/:userId", (req, res) => {
      const userId = req.params.userId;
      database = database.filter(u => u.id != userId);
  
          res.status(200).json({
          message:"user deleted"
      });
  }); // UC-206 delete an user using their Id
  

  module.exports = router;