const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB URL
//const mongoURL = "mongodb://localhost:27017/mydatabase";
const mongoURL = "mongodb://mongo:27017/mydatabase";

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection success
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB at " + mongoURL);
});

// Connection failure
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});

// Define a simple schema with id and name
const ItemSchema = new mongoose.Schema({
  id: String,
  name: String,
});

// Create a model based on the schema
const Item = mongoose.model("Item", ItemSchema);

// GET endpoint to retrieve items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
    console.log("Items retrieved successfully");
    console.log(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST endpoint to add a new item
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item({
      id: req.body.id,
      name: req.body.name,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);

    console.log("Item added successfully");
    console.log(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET endpoint to retrieve items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
    console.log("Items retrieved successfully");
    console.log(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`SpecialAPI running on http://localhost:${port}`);
});
