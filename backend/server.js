const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// Conexión DB y servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error("Mongo error:", err));

