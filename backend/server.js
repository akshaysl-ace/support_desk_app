const express = require("express");
const connectDataBase = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const env = require('dotenv').config();
const PORT = process.env.PORT || 8000;

connectDataBase();
const app = express();

app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({ message: "Hello from backend" });
})

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Use Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Srever started on port ${PORT}`);
});
