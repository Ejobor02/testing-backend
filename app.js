const express = require("express");
const mongoose = require("mongoose");
const Trainees = require("./model/todoModel");

const app = express();
const port = process.env.PORT || 8080;

// configure ejs and dotenv
app.set("view engine", "ejs");
require("dotenv").config();

//environmental Variable
const db_url = process.env.DBURL;

//custom middleware
//   app.use((req,res,next)=>{
//     console.log('a request was just made');
//     console.log(req.method);
//     console.log(req.path);
//     next()
//   })
app.use(express.static("public"));
//MongoDb connection
const connect = () => {
  mongoose.connect(db_url);
  try {
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err);
  }
};
// mongoose.connect(process, env.DB);
// .then(() => console.log('DB connected successfully'))
// .catch((err) => console.log(err))

//testing our Model and DB
app.get("/add-trainee",async (req, res) => {
  const TRAINEES = new Trainees({
    name: "Kruzship",
    profession: "senior Trader",
    description: "He dae trade!",
  });
//   TRAINEES.save()
//     .then((result) => {
//       res.send(result);
//     })
//    .catch((err)=>{
//     console.log(err);
//    })
// });

try{
  const savedTrainees = await TRAINEES.save()
  res.send(savedTrainees);
}catch(err){
  console.log(err);
} 
})

// For getting info from the DB
app.get("/all-trainees", async (req, res) => {
  try {
    const allTrainees = await Trainees.find();
    res.send(allTrainees);
  } catch (err) {
    console.log(err);
  }

  // .then((results)=>{
  // res.send(results)
  // })

  // .catch((err)=>{
  //   console.log(err);
  // })
});
// To get a single Trainee
app.get("/single-trainee", async (req, res) => {
  try {
    const singleTrainee = await Trainees.findById("647df2eb997cd86241fb583b");
    res.send(singleTrainee);
  } catch (err) {
    console.log(err);
  }
});

//routes
// const trainees = [
//   { name: "Christy", profession: "front-end-developer" },
//   { name: "Ejiro", profession: "back-end-developer" },
//   { name: "Henry", profession: "mobile app dev" },
//   { name: "John", profession: "desktop dev" },
// ];

app.get("/", (req, res) => {
  res.redirect('/todos')
  
});

app.get('/about', (req, res) => {
  res.render('/about', { title: "EJS ABOUT PAGE" });
});

// Todo Routes
app.get('/todos',async(req,res)=>{
  try{
    const allTrainees = await Trainees.find()

    res.render('index',{title: 'EJS HOMEPAGE',trainees:allTrainees})
  }catch(err){
    console.log(err);
  }
});
  
    



app.get("/todo/create", (req, res) => {
  res.render("createList", { title: "EJS create-todo page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "EJS Error" });
});

app.listen(port, () => {
  connect();
  console.log(`server runnimg on port ${port}`);
});
