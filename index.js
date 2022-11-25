const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


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
      const bookingsCollection = client
        .db("resellWizards")
        .collection("bookings");

      // All Email and Social User's Data Stored Here---------------------->>>>>>
      const usersCollection = client.db("resellWizards").collection("users");

      // All Advertise Books Collection Store Here------------>>>>>>>>>>>
      const advertisesCollection = client.db("resellWizards").collection("advertises");

      

      // Get All Categories and Show on Home Page------------------->>>>>>>>>>>>>>>>
      app.get("/categories", async (req, res) => {
        const query = {};
        const result = await categoriesCollection.find(query).toArray();
        res.send(result);
      });

      // Get All Books With Params Id and Show Category:id routes----------->>>>>>>>>>>>
      app.get("/category/:name", async (req, res) => {
        const name = req.params.name;
        const query = {};
        const allBooks = await booksCollection.find(query).toArray();
        const categoryBooks = allBooks.filter((n) => n.category_name === name);
        res.send(categoryBooks);
      });

      // Posted All Bookings from Booking Modal------------------->>>>>
      app.post("/bookings", async (req, res) => {
        const booking = req.body;
        const result = await bookingsCollection.insertOne(booking);
        res.send(result);
      });

      // Admin Panel Works Here--------------------------------------->>>>>

      // Post User's Data From Sign Up Page----------------------->>>>>>>>>>>>
      app.post("/users", async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      });

      // Admin Conditional Rendering---------by Email Params------------>>>>>>>>>>>>>>>>
      app.get("/users/admin/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        const user = await usersCollection.findOne(query);
        res.send({ isAdmin: user?.role === "admin" });
      });

      // Seller Conditional Rendering-------------------------->
      app.get("/users/seller/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        const user = await usersCollection.findOne(query);
        res.send({ isSeller: user?.role === "Seller" });
      });

      // Buyer Conditional Rendering With Email Params--------------------->>>>>>>>
      app.get("/users/buyer/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        const user = await usersCollection.findOne(query);
        res.send({ isBuyer: user?.role === "Buyer" });
      });

      // Post Add A Products--------------------Dashboard
      app.post("/books", async (req, res) => {
        const book = req.body;
        const result = await booksCollection.insertOne(book);
        res.send(result);
      });

      // Display Books on My Products Components------------------->>>>>>>>>>>>>>>>>>>>>>>>
      app.get("/books", async(req, res)=>{
        const email = req.query.email;
        const query = {email}
        const result = await booksCollection.find(query).toArray();
        res.send(result);

      })

      // Deleting Book from My Products Components-------------------------->>>>>>>>>>>>>>>
      app.delete("/books/:id", async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await booksCollection.deleteOne(query);
        res.send(result);
      })

      // Post Data to Advertise form My Products Component------------------------>>>>>>>>
      app.post("/advertises", async(req, res)=>{
        const advertise = req.body;
        const result = await advertisesCollection.insertOne(advertise);
        res.send(result);
      });

      // Display All Advertise Books on Home page--------------->>>>>>>>>>>>>>>>>>>>>>>>>>
      app.get("/advertises", async(req, res)=>{
        const query = {};
        const result = await advertisesCollection.find(query).toArray();
        res.send(result)
      })


      // Get All Buyers and Sellers
      // app.get("/books", async(req, res)=>{
      //   // const email = req.query.email;
      //   // console.log(email);
      //   const query = {role: "Seller"}
      //   const result = await usersCollection.find(query).toArray();
      //   res.send(result);

      // })


















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