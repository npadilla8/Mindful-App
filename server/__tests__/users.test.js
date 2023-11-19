const {mockDeep, JestMockExtended} = require('jest-mock-extended');
const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const prismaMock = require('../../mocks/prismaMock');

console.log(jest);

jest.mock('jsonwebtoken');

describe('GET /api/users', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        jest.resetAllMocks();
    });
    it('returns a list of all users', async () => {
        const adminUser = {
            id: 123,
            username: 'fakeUsername',
            email: 'fakeEmail@email.com',
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
        prismaMock.user.findMany.mockResolvedValue(users);

        const response = await request(app).get('/api/users').set('Authorization', 'Bearer faketesttoken');


        // console.log(response);

        expect(response.body[0]).toEqual(users[0]);
    });
});

describe.skip('GET /api/users/cart', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
    });

    beforeEach(() => {
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

        jwt.verify.mockReturnValue({id: user.id});
        prismaMock.user.findUnique.mockResolvedValue(user);

        const response = (await request(app).get('/api/users/cart').set('Authorization', 'Bearer faketesttoken'));

        console.log(response.body);
        expect(response.body).toEqual(user);
    });
});
