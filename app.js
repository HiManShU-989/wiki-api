const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://himanshu:Flutter1234@cluster0.ldhhkav.mongodb.net/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = {
    title:String,
    content:String
}

const Article = mongoose.model("Article", articleSchema);

/////////////////////////// Route targeting all articles /////////////////////////////////////

app.route("/articles")

.get(async function(req,res){
  try{
    const foundArticles = await Article.find({});
    res.send(foundArticles);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
})

.post(async function(req, res){
    try{
       const newArticle = new Article({
        title:req.body.title,
        content: req.body.content
       });
       await newArticle.save();
       console.log("Saved Successfully !!!!");
    }
    catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
})

.delete(async function(req,res){
  try{
     await Article.deleteMany({});
    res.send("Successfuly deleted all items");
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

///////////////////////////// Route targeting specific article //////////////////////////////////

app.route("/articles/:articleTitle")

.get(async function(req, res){
  try{
    const foundArticle = await Article.findOne({title: req.params.articleTitle});
    res.send(foundArticle);
  }
  catch (err) {
      console.log(err);
      res.status(500).send("Article not Found !!!!!!!!");
  }
})

.put(async function(req,res){
    try{
         await Article.updateMany(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content}
        )
         }
      catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
})

.patch(async function(req, res){
  try{
         await Article.updateMany(
        {title: req.params.articleTitle},
        {$set: (req.body)}
        )
         }
      catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
})

.delete(async function(req,res){
  try{
     await Article.deleteOne({title: req.params.articleTitle});
    res.send("Successfuly deleted  item");
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });