const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/client");

const {requireUser} = require('./utils');

//GET /api/cart/ - get cart by userId aka req.user.id 
cartRouter.get("/", requireUser, async (req, res, next) => {
    try{
        const cart = await prisma.cart.findUnique({
            where: {
                userId: req.user.id
            }
        })
        if (!cart) {
            res.send({
                message: "User does not have a cart."
            })
        }
        res.send(cart)
    } catch (error){
        next({message: "Unable to get cart for the user."})
    }
});

// GET /api/cart/:cartId
cartRouter.get("/:cartId", async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUniqueOrThrow({
            where: {
                id: Number(req.params.cartId)
            }
        });
        res.send(cart);
    } catch (error) {
        next({message: "Unable to get cart"});
    }
});



// DELETE /api/cart/:cartId
cartRouter.delete("/:cartId", async (req, res, next) => {
    try {
        const cart = await prisma.cart.delete({
            where: {
                id: Number(req.params.cartId)
            }
        });
        res.send(cart);
    } catch (next) {
        next({message: "Could not clear cart"})
    }
});

module.exports = cartRouter;
