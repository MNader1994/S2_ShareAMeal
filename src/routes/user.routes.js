const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")



router.get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      result: "Step on the moon"
    });
  }); // returns step on the moon as first result on requsting localhost
  
  
  
  router.post("/api/user",userController.addUser); // UC-201 register a new user 
  
  router.get("/api/user", userController.getAllUsers) // UC-202 get all users 
  
  router.get('/api/user/profile', userController.getUserProfile); // UC-203 get personal user profile
  
  
  router.get("/api/user/:userId", userController.getUserById); // UC-204 get a specific user using their Id
  
  
  router.put("/api/user/:userId", userController.updateAnUserById); // UC-205 update an user using their Id
  
  
  router.delete("/api/user/:userId", userController.deleteAnUserByID); // UC-206 delete an user using their Id
  

  module.exports = router;