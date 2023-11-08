const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/index");

// TODO: add {requireUser} function

//GET /api/cart/:cartId
cartRouter.get("/:cartId", async(req, res, next) => {
    try {
        const cart = await prisma.cart.findUniqueOrThrow({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(cart);
    } catch (error) {
        next("Unable to get cart");
    }
});

//POST /api/cart

//PUT /api/cart

//DELETE /api/cart

module.exports = cartRouter;
