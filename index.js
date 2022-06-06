const express = require('express');
const app = express();

const port = process.env.PORT || 3000

const bodyParser = require("body-parser");
const { use } = require('express/lib/application');
const userRouter = require("./src/routes/user.routes");

app.use(bodyParser.json());





app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Methode ${method} is aangeroepen`);
  next();
}); // getting the name of any requsted method 


app.use(userRouter);


app.all("*", (req,res) => {
  res.status(401).json({
    status:401,
    result: "End-point not found",
  });
}); // error massage as response if there is any invalid request  

app.use((err,req,res,next) =>{
  res.status(err.status).json(err);
}) // error handler

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})