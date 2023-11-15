const express = require("express");
const productsRouter = express.Router();
const prisma = require("../db/client");

const {requireAdmin} = require("./utils")

//GET /api/products - get all products
productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.send(products)
    } catch (error) {
        res.send("Unable to get all products.")
    }
})

//GET /api/products/:productId - get individual product
productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.productId),
            },
        });
        res.send(product);
    } catch {
        res.send("Unable to get individual product.");
    }
});


//POST /api/products - add new product only allowed for admins 
productsRouter.post("/", requireAdmin, async(req, res, next) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                title: req.body.title,
                image: req.body.image,
                description: req.body.description,
                price: req.body.price,
                available: req.body.available,
                returnPolicy: req.body.returnPolicy,
                quantity: req.body.quantity,
                categoryId: req.body.categoryId,
            }
        });
        res.send(newProduct);
    } catch (error) {
        res.send("Unable to create product.");
    }
});

//PUT /api/products/:productId - update existing product
productsRouter.put('/:productId/', requireAdmin, async (req, res, next) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(req.params.productId),
            },
            data: {
                title: req.body.title,
                image: req.body.image,
                description: req.body.description,
                price: req.body.price,
                available: req.body.available,
                returnPolicy: req.body.returnPolicy,
                quantity: req.body.quantity,
                categoryId: req.body.categoryId     
            },
        });
        res.send(updatedProduct);
    } catch (error) {
        res.send({message:"Unable to update product."});
    }
});

//DELETE /api/products/:productId - delete product 
productsRouter.delete('/:productId/', requireAdmin, async (req, res, next) => {
    try {
       const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(req.params.productId),
            },
        });
        res.send({
            message: "Product successfully deleted.",
            deletedProduct
        });
    } catch (error) {
        res.send("Unable to delete product");
    }
});


module.exports = productsRouter;
