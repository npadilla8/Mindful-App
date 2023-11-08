const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/index");

// TODO: add {requireUser} function

// GET /api/cart/:cartId
cartRouter.get("/:cartId", async (req, res, next) => {
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

// POST /api/cart
// creates a new post
// creates a new record in the relation table cartItem (items:create)
// connects the product assignment to existing product (product:connect)
// connects the cart to the user
cartRouter.post("/", async (req, res, next) => {
    try {
        const quantity = req.body.quantity;
        const cart = await prisma.cart.create({
            data: {
                items: {
                    create: [
                        {
                            quantity,
                            product: {
                                connect: {
                                    id: productId // FIX HERE - productId won't work
                                }
                            }
                        }
                    ]
                },
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });
    } catch (error) {
        next("Unable to create cart")
    }
});

// PUT /api/cart

// DELETE /api/cart

module.exports = cartRouter;
