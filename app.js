const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const autoIncrement = require("mongoose-auto-increment");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("public"));

mongoose.connect("mongodb+srv://Gary_Peabody:P@5sword@chitter-swg4k.mongodb.net/ChatterProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ChitterSchema = new mongoose.Schema({
  userName: {type:String, minlength: 1}, 
  content: {type: String, minlength: 1, maxlength:280}
});

autoIncrement.initialize(mongoose.connection);

ChitterSchema.plugin(autoIncrement.plugin, {
  model: "Chitter",
  startAt: 0,
  incrementBy: 1
});
module.exports = mongoose.model("Chitter", ChitterSchema);
const Chit = mongoose.model("Chitter", ChitterSchema);

const tweet = new Chit({
  userName: "Gary Peabody",
  content: "Welcome to my first chitter!"
});
// tweet.save()

app.get("/", function(req, res) {
  loadChits();
  res.sendFile(__dirname + "/index.html");
});

function loadChits() {
  Chit.find({}, "content userName")
    .lean()
    .sort({ _id: -1 })
    .exec(function(err, entries) {
      fs.writeFile("public/allTweets.json","[]",function(err){console.log("blank slate")})

      let currentVal = JSON.stringify(entries);
      fs.readFile("public/allTweets.json", function(err, filetext) {
        
        let chitFile = JSON.parse(filetext);
        
        chitFile.push(currentVal);
        fs.writeFile(
          "public/allTweets.json",
          JSON.stringify(chitFile),
          function(err) {
            console.log(err);
            console.log("File Written");
          }
        );
      });
    });
}

app.post("/", uploadChit);

function uploadChit(req, res) {
  const tweet = new Chit({
    userName: req.body.userName,
    content: req.body.chitText
  });
  tweet.save();

  res.redirect("/");
  //  res.send("Thank you for your kind words!");
}

app.listen(process.env.PORT || 3000, function() {
  console.log("Server up");
});

