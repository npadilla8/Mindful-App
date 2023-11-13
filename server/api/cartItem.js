const express = require("express");
const cartItemRouter = express.Router();
const prisma = require("../db/client");

const {requireUser} = require('./utils')


//POST /api/cartItem/ - add cart items (products) to cart 
cartItemRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                userId: req.user.id
            }
        });

        if(!cart) {
            res.send({
                message: "User does not have a cart to add items to."
            })
        }

        const cartId = cart.id;

        const cartItemInCart = await prisma.cartItem.create({
            data: {
                productId: req.body.productId,
                quantity: req.body.quantity,
                cartId: cartId,
            }
        })
        res.send(cartItemInCart)

    } catch (error) {
        res.send("unable to place product in cart.")
    }
});

//PUT /api/cartItem/:cartItemId - update quanity in cart
cartItemRouter.put("/:cartItemId", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                userId: req.user.id
            }
        });

        if(!cart){
            res.send({
                message: "User does not have items in cart to update."
            })
        };

        const cartId = cart.id;

        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: Number(req.params.cartItemId),
                cartId: cartId
            },
            data: {
                quantity: req.body.quantity
            }
        });
        res.send(updatedCartItem)
    } catch(error) {
        console.error(error);
        res.send("unable to update cart item quantity.")
    }
});

//DELETE /api/cartItem/:cartItemId
cartItemRouter.delete("/:cartItemId", requireUser, async(req, res, next) => {
    try{
        const cart = await prisma.cart.findUnique({
            where: {
                userId: req.user.id
            }
        });

        if(!cart){
            res.send({
                message: "User does not have items in cart to delete."
            })
        };

        const cartId = cart.id;

        const deletedCartItem = await prisma.cartItem.delete({
            where: {
                id: Number(req.params.cartItemId),
                cartId: cartId
            }
        });
        res.send(deletedCartItem)
    } catch (error) {
        console.error(error);
        res.send("Unable to delete product from cart.")
    }
});



module.exports = cartItemRouter;