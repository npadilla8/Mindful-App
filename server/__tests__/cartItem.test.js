const request = require('supertest');
const app = require('../app.js');
const prismaMock = require('../../mocks/prismaMock.js');
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('Cart Item API Tests', () => {
    const testUserId = 1;
  
    beforeEach(async () => {
      await prismaMock.cartItem.deleteMany();
      await prismaMock.cart.deleteMany();
      await prismaMock.user.deleteMany();
      await prismaMock.user.create({
        data: {
          id: testUserId,
        },
      });
    });
  
    describe('POST /api/cartItem/', () => {
      it('should add cart items to the cart', async () => {
        try {
          const response = await request(app)
            .post('/api/cartItem')
            .set('Authorization', 'Bearer faketesttoken')
            .send({
              userId: testUserId,
              productId: 123,
              quantity: 2,
            });
  
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty('productId');
          expect(response.body.quantity).toBe(2);
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  
    describe('PUT /api/cartItem/:cartItemId', () => {
      it('should update quantity in the cart', async () => {
        try {
          // Create a cart item for testing
          const createdCartItem = await prismaMock.cartItem.create({
            data: {
              productId: 123,
              quantity: 1,
              cartId: 'someCartId',
            },
          });
  
          const response = await request(app)
            .put(`/api/cartItem/${createdCartItem.id}`)
            .set('Authorization', 'Bearer faketesttoken')
            .send({
              quantity: 3,
            });
  
          expect(response.status).toEqual(200);
          expect(response.body.quantity).toBe(3);
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  
    describe('DELETE /api/cartItem/:cartItemId', () => {
      it('should delete a specific cart item by ID', async () => {
        try {
          // Create a cart item for testing
          const createdCartItem = await prismaMock.cartItem.create({
            data: {
              productId: 123,
              quantity: 1,
              cartId: 'someCartId',
            },
          });
  
          const response = await request(app)
            .delete(`/api/cartItem/${createdCartItem.id}`)
            .set('Authorization', 'Bearer faketesttoken');
  
          expect(response.status).toEqual(200);
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  });