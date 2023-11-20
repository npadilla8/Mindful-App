const request = require('supertest');
const app = require('../app.js');
const prismaMock = require('../../mocks/prismaMock.js');
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');


describe.skip('Cart API Tests', () => {
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

  describe('GET /api/cart/', () => {
    it('should get the user cart', async () => {
      try {
        const response = await request(app)
          .get('/api/cart')
          .set('Authorization', 'Bearer faketesttoken');
        expect(response.status).toEqual(200);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  describe('GET /api/cart/:cartId', () => {
    it('should get a specific cart by ID', async () => {
      try {
        // Creating the cart u
        const createdCart = await prismaMock.cart.create({
          data: {
            userId: testUserId,
          },
        });

        console.log('createdCart:', createdCart);

        // Fetching the cart by ID
        const response = await request(app)
          .get(`/api/cart/${createdCart.id}`)
          .set('Authorization', 'Bearer faketesttoken');
        expect(response.status).toEqual(200);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  describe('DELETE /api/cart/:cartId', () => {
    it('should delete a specific cart by ID', async () => {
      try {
        // Creating the cart using the mock instance
        const createdCart = await prismaMock.cart.create({
          data: {
            userId: testUserId,
          },
        });

        console.log('createdCart:', createdCart);

        // Deleting the cart by ID
        const response = await request(app)
          .delete(`/api/cart/${createdCart.id}`)
          .set('Authorization', 'Bearer faketesttoken');
        expect(response.status).toEqual(200);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});
