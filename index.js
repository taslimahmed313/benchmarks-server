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

async function run(){
    try{
        const categoriesCollection = client
          .db("resellWizards")
          .collection("categories");

        // All Category Based  Books Are Stored Here------------------->>>>  
        const booksCollection = client.db("resellWizards").collection("books");

        // All Bookings Are Stored Here------------->>>>>
        const bookingsCollection = client.db("resellWizards").collection("bookings");
        


        // Get All Categories and Show on Home Page------------------->>>>>>>>>>>>>>>>
        app.get("/categories", async(req, res)=>{
            const query = {};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result);
        })


        // Get All Books With Params Id and Show Category:id routes----------->>>>>>>>>>>>
        app.get("/category/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {};
            const allBooks = await booksCollection.find(query).toArray();
            const categoryBooks = allBooks.filter(n => n.category_id === id);
            res.send(categoryBooks);
        })


        // Posted All Bookings from Booking Modal------------------->>>>>
        app.post("/bookings", async(req, res)=>{
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result); 
        })

    }
    finally{

    }
}
run().catch(e => console.log(e));
















app.get("/", (req, res)=>{
    res.send("Resell Wizards Server Is Running......................")
})

app.listen(port, ()=>{
    console.log(`Available Port Is ${port}`)
})