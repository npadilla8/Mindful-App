//GET /api/products - get all products
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await prisma.products.findMany();
        res.send(products);
    } catch (error) {
        res.send("Unable to get products");
    }
});
const express = require("express");
const productsRouter = express.Router();
const prisma = require("../db/client");

//GET /api/products - get all products
productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.send(products)
    } catch (error) {
        res.send("unable to get products")
    }
})

productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await prisma.products.findMany({
        where: { id: req.product.id },
      });
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

//GET /api/products/:productId - get individual product
productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await prisma.products.findUnique({
            where: {
                id: Number(req.params.productId),
            },
        });
        res.send(product);
    } catch {
        res.send("Unable to get individual product");
    }
});


//POST /api/products - add new product
productsRouter.post("/create", async(req, res, next) => {
    try {
        const newProduct = await prisma.products.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
            }
        });
        res.send(newProduct);
    } catch (error) {
        res.send("Unable to create product");
    }
});

//PUT /api/products/:productId - update existing product
productsRouter.put('/:productId/update', async (req, res, next) => {
    try {
        const updatedProduct = await prisma.products.update({
            where: {
                id: Number(req.params.productId),
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                
            },
        });
        res.send(updatedProduct);
    } catch (error) {
        res.send("Unable to update product");
    }
});

//DELETE /api/products/:productId - delete product 
productsRouter.delete('/:productId/delete', async (req, res, next) => {
    try {
        await prisma.products.delete({
            where: {
                id: Number(req.params.productId),
            },
        });
        res.send("Product deleted successfully");
    } catch (error) {
        res.send("Unable to delete product");
    }
});


module.exports = productsRouter;
