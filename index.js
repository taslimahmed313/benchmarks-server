const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4nt1ond.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

















app.get("/", (req, res)=>{
    res.send("Resell Wizards Server Is Running......................")
})

app.listen(port, ()=>{
    console.log(`Available Port Is ${port}`)
})