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





app.listen(port, () => {
  console.log(`Server running at ${port}`)
})