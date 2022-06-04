const express = require('express');
const app = express();

const port = process.env.PORT || 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json());



let database = [];
let id =0;

app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Methode ${method} is aangeroepen`);
  next();
}); // getting the name of any requsted method 


app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    result: "Step on the moon"
  });
}); // returns step on the moon as first result on requsting localhost



app.post("/api/user", (req, res) =>{
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

app.get("/api/user", (req, res) => {
  res.status(200).json({
    status:200,
    result: database,
  });
}) // UC-202 get all users 


app.get("/api/user/:userId", (req, res) => {
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


app.all("*", (req,res) => {
  res.status(401).json({
    status:401,
    result: "End-point not found",
  });
});


app.listen(port, () => {
  console.log(`Server running at ${port}`)
})