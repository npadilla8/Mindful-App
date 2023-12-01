const express = require("express");
const orderRouter = express.Router();
const prisma = require("../db/client");

const {requireAdmin, requireUser} = require("./utils");

// GET api/order
orderRouter.get("/:orderId", async (req, res, next) =>
{
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.orderId),
            },
        });
        res.send(order);
    } catch (error) {
        console.error(error)
        next({message: "Unable to get order", error});
    }
});

// POST api/order
orderRouter.post("/", requireUser, async (req, res, next) => {
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

        const newOrder = await prisma.order.create({
            data: {
                status: "Processing",
                totalAmount: req.body.totalAmount,
                user: {
                    connect: {
                        id: req.user.id
                    }
                },
                items: {
                    connect: shopperWithCart.cart.items
                    // .map(item) => {
                        // return {id: item.id}
                    // }
                }
            }
        });
        res.send(newOrder);
    } catch (error) {
        console.error(error)
        next({message: "Unable to create order", error});
    }
});

// PUT api/order
orderRouter.put("/:orderId", requireAdmin, async (req, res, next) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(req.params.orderId),
            },
            data: {
                status: "Processing",
                totalAmount: req.body.totalAmount,
                userId: req.body.userId
            }
        });
        res.send(updatedOrder);
    } catch (error) {
        console.error(error)
        next({message: "Unable to update order", error});
    }
});

// DELETE api/order
orderRouter.delete("/:orderId", async (req, res, next) => {
    try {
        const deletedOrder = await prisma.order.delete({
            where: {
                id: Number(req.params.orderId),
            },
        });
        res.send({
            message: "Order successfully deleted",
            deletedOrder
        });
    } catch (error) {
        console.error(error)
        next({message: "Unable to delete order", error});
    }
});

module.exports = orderRouter;
