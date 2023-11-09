const express = require("express");
const cartItemRouter = express.Router();
const prisma = require("../db/client");


//POST /api/cartItem/:productId - add cart items (products) to cart 
cartItemRouter.post("/:productId", async (req, res, next) => {
    try {
        const cartItemInCart = await prisma.cartItem.create({
            data: {
                productId: Number(req.params.productId),
                quantity: req.body.quantity,
                cartId: req.body.cartId,
            }
        })
        res.send(cartItemInCart)

    } catch (error) {
        res.send("unable to place product in cart.")
    }
});



module.exports = cartItemRouter;