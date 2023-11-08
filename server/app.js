const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')))

app.get("/test", (req, res, next) => {
  res.send("Test route");
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// TODO: Add your routers here
const cartRouter = require("./api/cart");
app.use("/api/cart", cartRouter);

const productsRouter = require("./api/products");
app.use("/api/products", productsRouter);

const usersRouter = require("./api/users");
app.use("/api/users", usersRouter);

// const cartItemRouter = require("./api/cartItem");
// app.use("/api/cartItem", cartItemRouter);

// const categoriesRouter = require("./api/categories");
// app.use("/api/categories", categoriesRouter);

// const orderRouter = require("./api/order");
// app.use("/api/order", orderRouter);

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

// 404 handler
app.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found',
        message: 'No route found for the requested URL',
    });
});


module.exports = app;
