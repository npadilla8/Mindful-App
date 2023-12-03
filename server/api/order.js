const express = require("express");
const orderRouter = express.Router();
const prisma = require("../db/client");

const { requireAdmin, requireUser } = require("./utils");

//GET api/order testing functionality of router
orderRouter.get('/', async (req, res, next) => {
    try {
        res.send("This is the order api!!!")
    } catch (error) {
        console.error(error)
        next({ message: "unable to get test router!!" })
    }
})

// GET api/order
orderRouter.get("/:orderId", async (req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.orderId),
            },
        });
        res.send(order);
    } catch (error) {
        console.error(error)
        next({ message: "Unable to get order", error });
    }
});

// POST api/order - create new order for user with items in cart 
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

        // iterate through cart items array and find total price for each item based on price and quantity
        const totalForEachItemArray = shopperWithCart.cart.items.map(async (item) => {
            const singleProduct = await prisma.product.findUnique({
                where: {
                    id: item.productId
                }
            });

            return item.quantity * singleProduct.price
        });

        // wait for calculations for each cartitem object in array to resolve before filling the variable
        const priceForEachItemArray = await Promise.all(totalForEachItemArray);

        // calculation to get grand total for all cartitems and their quantities 
        const totalPriceForOrder = priceForEachItemArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });

        //post new order into order table 
        const newOrder = await prisma.order.create({
            data: {
                status: "Processing",
                totalAmount: totalPriceForOrder,
                userId: req.user.id,
                items: {
                    create:
                        shopperWithCart.cart.items.map((item) => {
                            return {
                                productId: item.productId,
                                quantity: item.quantity
                            }
                        })
                }
            }
        });

        res.send({
            message: "New order has been created.",
            newOrder
        });

    } catch (error) {
        console.error(error)
        next({ message: "Unable to create order", error });
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
        next({ message: "Unable to update order", error });
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
        next({ message: "Unable to delete order", error });
    }
});

module.exports = orderRouter;
