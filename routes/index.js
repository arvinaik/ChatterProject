const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs")


router.get("/userFinder", loadUserPage);
function loadUserPage(req, res) {
  const userSearched = req.query.userToFind;
    loadUserChits(userSearched);

  res.render("userHome", { userName: userSearched });
}

mongoose.createConnection(
    "mongodb+srv://Gary_Peabody:P@5sword@chitter-swg4k.mongodb.net/ChatterProject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 5
    },function(err){
        if (err){console.log(err)
            
        }else{console.log("Successfully connected")}}
  );

const emptySchema = new mongoose.Schema({},{collection:"chitters"});
// to access existing collection in the database, pass an empty schema, and define it by the existing collections name: ie {collection: "chitters"}
module.exports = mongoose.model("empty", emptySchema);

const Chit= mongoose.model("empty", emptySchema);

function loadUserChits(userSearched) {
    
    Chit.find({userName: userSearched}, "_id content userName postTime")
      .lean()
      .sort({ postTime: -1 })
      .exec(function(err, entries) {
        fs.writeFile("public/userTweets.json", "[]", function(err) {
          console.log("blank slate");
        });
  
        let currentVal = JSON.stringify(entries);
        fs.readFile("public/userTweets.json", function(err, filetext) {
          let chitFile = JSON.parse(filetext);
  
          chitFile.push(currentVal);
          fs.writeFile(
            "public/userTweets.json",
            JSON.stringify(chitFile),
            function(err) {
              console.log(err);
              console.log("File Written");
            }
          );
        });
      });
  }



     

module.exports = router;
