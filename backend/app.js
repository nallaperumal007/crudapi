// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route to add a new user
app.post("/details", async (req, res) => {
  try {
    const response = await axios.post("http://45.127.102.218:3000/details", req.body);
    res.send(response.data);
  } catch (error) {
    console.error("Error in POST /details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get user by ID
app.get("/details/:id", async (req, res) => {
  try {
    const response = await axios.get(`http://45.127.102.218:3000/details/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /details/:id:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get user by email
app.get("/details", async (req, res) => {
  try {
    const response = await axios.get(`http://45.127.102.218:3000/details?email=${req.query.email}`);
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get all users
app.get("/all-details", async (req, res) => {
  try {
    const response = await axios.get("http://45.127.102.218:3000/all-details");
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /all-details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to update user by ID
app.put('/details/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // Perform the PUT request to update the user on the external server
    const response = await axios.put(`http://45.127.102.218:3000/details/${userId}`, updatedData);
    res.send(response.data);
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    res.status(500).send({ status: 'error', message: error.message });
  }
});

// Route to delete user by ID
app.delete('/details/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Perform the DELETE request to remove the user from the external server
    const response = await axios.delete(`http://45.127.102.218:3000/details/${userId}`);
    res.send(response.data);
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    res.status(500).send({ status: 'error', message: error.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
