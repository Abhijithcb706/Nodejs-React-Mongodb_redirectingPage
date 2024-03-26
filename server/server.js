const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const UserModel = require("./models/userModel");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

app.use(cors());

const port = 5000;

mongoose
  .connect(
    "mongodb+srv://abhijith:Abhijith2001@cluster0.ypyxvlu.mongodb.net/testData",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("db connected");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.post("/signup", async (req, res) => {
  let hashedPassword = undefined;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    console.log(error);
  }
  console.log(hashedPassword);
  const newData = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  newData
    .save()

    .then((data) => {
      console.log("Data saved successfully:", data);
      res.status(200).send("Data saved successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving data");
    });
});

app.get('/userData', async (req, res) => { 
  const {email} = req.body;
  const userData = await UserModel.findOne({email:email}); 
  res.json(userData); 
  console.log("user:", userData);
}); 


app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
