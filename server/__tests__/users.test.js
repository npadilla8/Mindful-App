const {mockDeep, JestMockExtended} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const prismaMock = require('../../mocks/prismaMock');
const bcrypt = require('bcrypt');

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe.skip('GET /api/users', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        jest.resetAllMocks();
    });

    it('returns a list of all users', async () => {
        const adminUser = {
            id: 123,
            // username: 'fakeUsername',
            // email: 'fakeEmail@email.com',
            isAdmin: true
        };

        const users = [
            {id: 1234,
            username: 'fakeUsername2',
            email: 'fakeEmail2@email.com',
            isAdmin: false},
            {id: 12345,
            username: 'fakeUsername3',
            email: 'fakeEmail3@email.com',
            isAdmin: false}
        ];

        jwt.verify.mockReturnValue({id: adminUser.id})
        prismaMock.user.findUnique.mockResolvedValue(adminUser);
        prismaMock.user.findMany.mockResolvedValue(users);

        const response = await request(app).get('/api/users').set('Authorization', 'Bearer faketesttoken');

        expect(response.body[0]).toEqual(users[0]);
        expect(response.body[1]).toEqual(users[1]);
    });
});

describe.skip('GET /api/users/cart', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        jest.resetAllMocks();
    });

    it('returns individual users with carts', async () => {
        const user = {
            id: 123
        };

        const cart = {
            id: 1234,
            items: true
        };

        const userWithCart = {
            id: user.id,
            cart
        };

        jwt.verify.mockReturnValue({id: user.id});
        prismaMock.user.findUnique.mockResolvedValue(userWithCart);

        const response = (await request(app).get('/api/users/cart').set('Authorization', 'Bearer faketesttoken'));

        console.log(response.body);
        expect(response.body.id).toEqual(user.id);
        expect(response.body.cart).toEqual(cart);
    });
});

describe('POST /api/users/register', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        jest.resetAllMocks();
    });

    it('creates a new user and a token', async () => {
        const newUser = {
            username: 'fakeUsername',
            email: 'fakeEmail@email.com',
            hashedPassword: 'fakePassword',
        };

        const createdUser = {
            id: 1,
            username: 'fakeUsername',
            email: 'fakeEmail@email.com',
        };

        const token = "abcdef";
        const hashedPassword = "somehashedpassword";

        bcrypt.hash.mockResolvedValue(hashedPassword);
        prismaMock.user.findUnique.mockResolvedValue(null);
        prismaMock.user.create.mockResolvedValue(createdUser);
        jwt.sign.mockReturnValue(token);

        const response = await request(app).post('/api/users/register').send(newUser);

        expect(response.body.newUser.username).toEqual(createdUser.username);
        expect(response.body.newUser.email).toEqual(createdUser.email);
        expect(response.body.token).toEqual(token);
    });
});

describe.skip('POST /api/users/login', () => {
    beforeEach(async () => {
        await prismaMock.user.create.mockResolvedValue({
            id: 1234,
            username: 'testusername',
            email: 'testemail@email.com'
        });
    });

    it('logs in a user with valid username and password', () => {

    });
});
