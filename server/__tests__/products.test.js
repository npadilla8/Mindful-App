const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const prismaMock = require('../../mocks/prismaMock');
jest.mock('jsonwebtoken');

describe('/api/products', () => {
    describe('GET /api/products', () => {
        it('returns all products', async () => {
            const products = [
                {
                    id: 1,
                    image: "image1",
                    title: "title1",
                    description: "description1",
                    price: 1,
                    available: true,
                    returnPolicy: false,
                    quantity: 2,
                    categoryId: 1
                },
                {
                    id: 2,
                    image: "image2",
                    description: "description2",
                    price: 5,
                    available: true,
                    returnPolicy: true,
                    quantity: 10,
                    categoryId: 2
                },
            ];
            prismaMock.product.findMany.mockResolvedValue(products);

            const response = await request(app).get('/api/products');

            expect(response.status).toBe(200)
                
            expect(response.body[0]).toEqual(products[0]);
            expect(response.body[1]).toEqual(products[1]);
        })
    })

    describe('GET /api/products/:productId', () => {
        it('gets individual product by ID', async () => {
            const singleProduct = {
                id: 3,
                title: "test3",
                description: "description3",
                price: 50,
                available: true,
                returnPolicy: false,
                quantity: 1,
                categoryId: 4,
            };

            prismaMock.product.findUnique.mockResolvedValue(singleProduct);

            const response = await request(app).get('/api/products/3');

            expect(response.status).toBe(200)
                
            expect(response.body.id).toEqual(singleProduct.id);
            expect(response.body.title).toEqual(singleProduct.title);
            expect(response.body.description).toEqual(singleProduct.description);
            expect(response.body.price).toEqual(singleProduct.price);
            expect(response.body.available).toEqual(singleProduct.available);
            expect(response.body.returnPolicy).toEqual(singleProduct.returnPolicy);
            expect(response.body.quantity).toEqual(singleProduct.quantity);
            expect(response.body.categoryId).toEqual(singleProduct.categoryId);
        })
    })

    describe('POST /api/products', () => {
        it('adds new product', async () => {
            const adminUser = {
                id: 5,
                isAdmin: true,
            }

            const newProduct = {
                id: 10,
                image: "test10",
                description: "description10",
                price: 100,
                available: true,
                returnPolicy: false,
                quantity: 3,
                categoryId: 3
            };

            jwt.verify.mockReturnValue({ id: adminUser.id });
            prismaMock.user.findUnique.mockResolvedValue(adminUser);
            prismaMock.product.create.mockResolvedValue(newProduct);

            const response = await request(app)
                .post('/api/products')
                .set('Authorization', 'Bearer AdminToken')
                .send(newProduct);

            expect(response.status).toBe(200)
                
            expect(response.body.title).toEqual(newProduct.title);
            expect(response.body.image).toEqual(newProduct.image);
            expect(response.body.description).toEqual(newProduct.description);
            expect(response.body.price).toEqual(newProduct.price);
            expect(response.body.available).toEqual(newProduct.available);
            expect(response.body.returnPolicy).toEqual(newProduct.returnPolicy);
            expect(response.body.quantity).toEqual(newProduct.quantity);
            expect(response.body.categoryId).toEqual(newProduct.categoryId);

            expect(prismaMock.product.create).toHaveBeenCalledTimes(1);
        })
    })

    describe('PUT /api/products/:productId', () => {
        it('updates existing product', async () => {
            const productToUpdate = { id: 5 }

            const adminUser = {
                id: 10,
                isAdmin: true,
            }

            const updatedProduct = {
                id: 5,
                title: "title10",
                image: "image10",
                description: "description10",
                price: 20,
                available: true,
                returnPolicy: true,
                quantity: 5,
                categoryId: 2,
            }

            jwt.verify.mockReturnValue({ id: 10 });
            prismaMock.user.findUnique.mockResolvedValue(adminUser);
            prismaMock.product.findUnique.mockResolvedValue(productToUpdate);
            prismaMock.product.update.mockResolvedValue(updatedProduct);

            const response = await request(app)
                .put('/api/products/5')
                .set('Authorization', 'Bearer adminToken')
                .send(updatedProduct);
            
            expect(response.status).toBe(200)
                
            expect(response.body.title).toEqual(updatedProduct.title);
            expect(response.body.image).toEqual(updatedProduct.image);
            expect(response.body.description).toEqual(updatedProduct.description);
            expect(response.body.price).toEqual(updatedProduct.price);
            expect(response.body.available).toEqual(updatedProduct.available);
            expect(response.body.returnPolicy).toEqual(updatedProduct.returnPolicy);
            expect(response.body.quantity).toEqual(updatedProduct.quantity);
            expect(response.body.categoryId).toEqual(updatedProduct.categoryId);
        })

        describe('DELETE /api/products/productId', () => {
            it('deletes a single product', async () => {
                const adminUser = {
                    id: 10,
                    isAdmin: true,
                }

                const deletedProduct = {
                    id: 20,
                    title: "title20",
                    image: "image20",
                    description: "description20",
                    price: 40,
                    available: true,
                    returnPolicy: false,
                    quantity: 3,
                    categoryId: 1,
                }

                jwt.verify.mockReturnValue({ id: 10 });
                prismaMock.user.findUnique.mockResolvedValue(adminUser);
                prismaMock.product.findUnique.mockResolvedValue(deletedProduct);
                prismaMock.product.delete.mockResolvedValue(deletedProduct);

                const response = await request(app)
                    .delete('/api/products/20')
                    .set('Authorization', 'Bearer adminToken')      
            
                expect(response.status).toBe(200)

                expect(response.body.deletedProduct.title).toEqual(deletedProduct.title);
                expect(response.body.deletedProduct.image).toEqual(deletedProduct.image);
                expect(response.body.deletedProduct.description).toEqual(deletedProduct.description);
                expect(response.body.deletedProduct.price).toEqual(deletedProduct.price);
                expect(response.body.deletedProduct.available).toEqual(deletedProduct.available);
                expect(response.body.deletedProduct.returnPolicy).toEqual(deletedProduct.returnPolicy);
                expect(response.body.deletedProduct.quantity).toEqual(deletedProduct.quantity);
                expect(response.body.deletedProduct.categoryId).toEqual(deletedProduct.categoryId);

            })
        })
    })
})
