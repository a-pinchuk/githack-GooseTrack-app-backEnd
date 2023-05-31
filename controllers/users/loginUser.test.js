const httpMocks = require('node-mocks-http'); // Обновленный импорт
const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login } = require('./loginUser');

jest.mock('../../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const { SECRET_KEY } = process.env;

describe('Login Controller', () => {
  it('Should return status code 200 and a token', async () => {
    const request = httpMocks.createRequest({
      // Обновленный вызов
      method: 'POST',
      url: '/login',
      body: {
        email: 'test@test.com',
        password: '123456',
      },
    });
    const response = httpMocks.createResponse(); // Обновленный вызов

    const user = {
      _id: 'user1',
      email: 'test@test.com',
      password: 'hashedpassword',
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('testtoken');

    await login(request, response);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response._getData())).toEqual({
      token: 'testtoken',
    });
  });
});
