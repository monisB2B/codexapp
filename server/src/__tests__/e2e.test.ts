import request from 'supertest';
import app from '../index';

describe('e2e', () => {
  it('login create item get item', async () => {
    await request(app).post('/api/auth/register').send({ username: 'e', email: 'e@e.com', password: 'pass' });
    const login = await request(app).post('/api/auth/login').send({ email: 'e@e.com', password: 'pass' });
    const token = login.body.token;
    const create = await request(app).post('/api/items').set('Authorization', `Bearer ${token}`).send({ sku: 's2', name: 'item2', qty: 2, locationId: 1, userId: 1 });
    const id = create.body.id;
    const get = await request(app).get(`/api/items/${id}`).set('Authorization', `Bearer ${token}`);
    expect(get.body.id).toBe(id);
  });
});
