const express = require("express");
const usersRouter = express.Router();
const prisma = require("../db/client");

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const jwt = require("jsonwebtoken");
const { JWT } = process.env

const {requireUser, requireAdmin} = require('./utils');

//GET /api/users - get all users without their passwords
usersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();

        const usersWithoutPassword = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

        res.send(usersWithoutPassword)
    } catch (error) {
        res.send("unable to get users")
    }
});

//GET /api/users/cart - get individual shoppers with carts
usersRouter.get('/cart', requireUser, async (req, res, next) => {
    try {
        const shopperWithCart = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            include: {
                cart: {
                    include: {
                        items: true
                    }
                }
            }
        });

        delete (shopperWithCart.hashedPassword);
        
        res.send(shopperWithCart)
    } catch {
        res.send("unable to get individual user")
    }
});

//POST /api/users/register - register new user (empty cart also created)
usersRouter.post("/register", async (req, res, next) => {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            }
        });

        if (user) {
            res.send("A user by that username already exist")
        } else {

            const newUser = await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    hashedPassword: hashedPassword,
                    cart: {
                        create: {} 
                    }
                }
            });

            delete newUser.hashedPassword

            const token = jwt.sign({ id: newUser.id }, JWT);

            res.send({ newUser, token });
        }
    } catch (error) {
        console.error(error);
        res.send("unable to register")
    }
});

//POST /api/users/login - login existing user 
usersRouter.post("/login", async (req, res, next) => {
    try {
        const password = req.body.password;

        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });

        if (!user) {
            return res.status(401).send({
                message: "Unable to log in. User does not exist."
            })
        };

        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordsMatch) {
            return res.status(401).send({
                message: "Invalid login credentials."
            });
        };

        const token = jwt.sign({ id: user.id }, JWT);

        delete (user.hashedPassword);

        res.send({ user, token });
    } catch (error) {
        res.send({
            message: "Unable to log in."
        })
    }
});



module.exports = usersRouter;