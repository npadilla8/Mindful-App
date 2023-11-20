const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken')

const { JWT } = process.env

const prisma = require('../db/client')

//testing functionality of router
apiRouter.get('/', (req, res, next)=> {
    res.send("This is the apiRouter")
});

//set "req.user"
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const {id} = jwt.verify(token, JWT);

            if (id) {
                req.user = await prisma.user.findUnique({
                    where: {
                        id: id
                    }
                })
                next();
            } else {
                res.status(401).send({
                    message: 'Authorization token malformed'
                });
            }
            console.log(req.user)
        } catch (error) {
            res.send({error: error.message})
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token must start with ' + prefix
        })
    }
});

//subroutes of apiRouter
const cartRouter = require('./cart')
apiRouter.use('/cart', cartRouter);

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products')
apiRouter.use('/products', productsRouter)

const cartItemRouter = require('./cartItem')
apiRouter.use('/cartItem', cartItemRouter)



module.exports = apiRouter
