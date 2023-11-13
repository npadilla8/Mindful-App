const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require('cors');

// for ports security
app.use(cors());

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')))

app.get("/test", (req, res, next) => {
  res.send("Test route");
});

// TODO: Add your routers here
const apiRouter = require("./api");
app.use("/api", apiRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) {
        res.status(500);
    }
    res.send({
        error: error.message,
        name: error.name,
        message: error.message,
        table: error.table,
    });
});

// TODO: find another way to send all routes to serve index.html
// because otherwise faulty routes won't go to 404 below
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 404 handler
app.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found',
        message: 'No route found for the requested URL',
    });
});

module.exports = app;
