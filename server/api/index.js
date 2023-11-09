const express = require('express');
const apiRouter = express.Router();

//testing functionality of router
apiRouter.get('/', (req, res, next)=> {
    res.send("This is the apiRouter")
})


//subroutes of apiRouter
const cartRouter = require('./cart')
apiRouter.use('/cart', cartRouter);

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products')
apiRouter.use('/products', productsRouter)



module.exports = apiRouter