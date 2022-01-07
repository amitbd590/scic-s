const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
var cors = require("cors");
const ObjectId =require('mongodb').ObjectId;
require('dotenv').config();
const port =process.env.PORT|| 5000;

app.use(cors());
app.use(express.json())

// id:  AmitDB  pass: OnocNlrr3B8oDXIG

// ------------------------

const uri =
  "mongodb+srv://AmitDB:NfhuYBg4XmkoWfNe@cluster0.edo8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database One
async function run() {
  try {
    await client.connect();

    // user data
    const userDatabase = client.db("userDB");
    const userdata = userDatabase.collection("users");

    // Make Admin data
    const adminDatabase = client.db("userDB");
    const admindata = adminDatabase.collection("admin");

    // Product data
    const productDatabase = client.db("insertDB");
    const product = productDatabase.collection("product");


    // Order Data
    const Orderdatabase = client.db("orderDB");
    const order = Orderdatabase.collection("order");

// Review Data
    const Reviewdatabase = client.db("ReviewDB");
    const review = Reviewdatabase.collection("review");

// Purchase data
    const Purchasedatabase = client.db("PurchaseDB");
    const purchase = Purchasedatabase.collection("purchase");




    // Post API product
    app.post('/product', async(req,res)=>{
      const newUser= req.body;

      const result=await product.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })

    // Post API Admin
    app.post('/admin', async(req,res)=>{
      const newUser= req.body;

      const result=await admindata.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })



    // Post API Order
    app.post('/order', async(req,res)=>{
      const newUser= req.body;

      const result=await order.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })

    app.get('/order',async (req, res)=>{
      const email= req.query.email;
      const query = {email:email}
      console.log(query);
      const cursor = order.find(query)
      const orderData = await cursor.toArray();
      res.json(orderData)
    })


    // Post API review
    app.post('/review', async(req,res)=>{
      const newUser= req.body;

      const result=await review.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })


    // Post API purchase
    app.post('/purchase', async(req,res)=>{
      const newUser= req.body;

      const result=await purchase.insertOne(newUser)
      console.log('start', req.body);
      console.log('Add user-', result);
      res.send('Enter the point')
    })

   



    // Find API user
    app.get('/product',async(req,res)=>{
      const cursor= product.find({});
      const users=await cursor.toArray();
      res.send(users);
    })
    // Find API admin
    app.get('/admin',async(req,res)=>{
      const cursor= admindata.find({});
      const users=await cursor.toArray();
      res.send(users);
    })
    // Find API order
    app.get('/order',async(req,res)=>{
      const cursor= order.find({});
      const users=await cursor.toArray();
      res.send(users);
    })
    // Find API review
    app.get('/review',async(req,res)=>{
      const cursor= review.find({});
      const users=await cursor.toArray();
      res.send(users);
    })


    // Find API purchase
    app.get('/purchase',async(req,res)=>{
      const cursor= purchase.find({});
      const users=await cursor.toArray();
      res.send(users);
    })


    
    // Delete API product

    app.delete('/product/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await product.deleteOne(query)
      console.log('Deleteing id ', result);
      res.json(result)
    })


    // Delete API Order

    app.delete('/order/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await order.deleteOne(query)
      console.log('Deleteing id ', result);
      res.json(result)
    })

    // Delete API manage Order

    app.delete('/purchase/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await purchase.deleteOne(query)
      console.log('Deleteing id ', result);
      res.json(result)
    })



    
  }
   finally {
    // await client.close();
  }
}
run().catch(console.dir);


//  ----------------------

const hendel = (req, res) => {
  res.send("Hello Node JS");
};

app.get("/", hendel);

app.listen(port, () => {
  console.log("listening to portv", port);
});



app.get("/user", (req, res) => {
  res.send("Hello 1200 world 2");
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  res.send(user);
});



