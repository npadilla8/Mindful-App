const express = require("express");
const cartRouter = express.Router();
const prisma = require("../db/index");

// TODO: add {requireUser} function

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
        res.send(cart);
    } catch (error) {
        next("Unable to create cart")
    }
});

// PUT /api/cart
cartRouter.put("/:cartId", async (req, res, next) => {
    try {
        // how to get the product that was clicked from req.body?
        // const { items } = req.body;
        const cart = await prisma.cart.update({
            where: {
                id: Number(req.params.cartId)
            },
            data: {
                items
            }
        });
        res.send(cart);
    } catch (error) {
        next("Unable to update cart")
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
        next("Could not clear cart")
    }
});

module.exports = cartRouter;
