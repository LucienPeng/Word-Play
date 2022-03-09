// IMPORT
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Player } from "./modules/schema.js";
const app = express();

// DB ACC/PSW Settings
const username = encodeURIComponent("Lucien");
const password = encodeURIComponent("/nxfl7zp");
const database = encodeURIComponent("sample_mflix");
const uri = `mongodb+srv://${username}:${password}@leaflix-east.cpen3.mongodb.net/${database}?retryWrites=true&w=majority`;

//Connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.log(e);
  });

// Middlewares
app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/player", async (req, res) => {
  let { nom, score } = req.body;
  let newPlayer = new Player({
    nom,
    score,
  });
  await newPlayer
    .save()
    .then(() => {
      res.send("Data has been well saved");
      console.log("Data has been well saved");
    })
    .catch((e) => {
      console.log("Player not accepted.");
      console.log(e);
    });
});

app.get("/player", async (req, res) => {
  try {
    let data = await Player.find({});
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.post("/playerupdate", async (req, res) => {
  let { nom, score } = req.body;

  const filter = { nom: nom };
  const update = { score: score };

  Player.findOneAndUpdate(filter, update, {
    new: true,
  }).then((meg) => {
    console.log(meg);
    res.send("Data has been updated");
  });
});

app.get("/player/:nom", async (req, res) => {
  let { nom } = req.params;
  try {
    let data = await Player.find({ nom });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/word-play", (req, res) => {
  res.send("Well connected");
});

app.get("/", (req, res) => {
  res.render("Question.html");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
