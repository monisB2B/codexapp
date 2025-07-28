import request from 'supertest';
import app from '../index';

describe('auth', () => {
  it('registers and logs in', async () => {
    const res = await request(app).post('/api/auth/register').send({ username: 't', email: 't@e.com', password: 'pass' });
    expect(res.status).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email: 't@e.com', password: 'pass' });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
