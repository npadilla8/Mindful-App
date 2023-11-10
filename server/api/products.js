

//GET /api/products - get all products

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


//POST /api/products - add new product

//PUT /api/products/:productId - update existing product

//DELETE /api/products/:productId - delete product 
