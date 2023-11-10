const express = require("express");
const cartItemRouter = express.Router();
const prisma = require("../db/client");


//POST /api/cartItem/ - add cart items (products) to cart 
cartItemRouter.post("/", async (req, res, next) => {
    try {
        const cartItemInCart = await prisma.cartItem.create({
            data: {
                productId: req.body.productId,
                quantity: req.body.quantity,
                cartId: req.body.cartId,
            }
        })
        res.send(cartItemInCart)

    } catch (error) {
        res.send("unable to place product in cart.")
    }
});

//PUT /api/cartItem/:cartItemId - update quanity in cart
cartItemRouter.put("/:cartItemId", async (req, res, next) => {
    try {
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: Number(req.params.cartItemId),
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
cartItemRouter.delete("/:cartItemId", async(req, res, next) => {
    try{
        const deletedCartItem = await prisma.cartItem.delete({
            where: {
                id: Number(req.params.cartItemId)
            }
        });
        res.send(deletedCartItem)
    } catch (error) {
        console.error(error);
        res.send("unable to delete cart item from cart")
    }
});




module.exports = cartItemRouter;