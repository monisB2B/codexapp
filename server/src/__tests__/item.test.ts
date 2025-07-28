import request from 'supertest';
import app from '../index';

let token: string;

beforeAll(async () => {
  await request(app).post('/api/auth/register').send({ username: 'i', email: 'i@e.com', password: 'pass' });
  const res = await request(app).post('/api/auth/login').send({ email: 'i@e.com', password: 'pass' });
  token = res.body.token;
});

describe('items', () => {
  it('creates and gets item', async () => {
    const create = await request(app).post('/api/items').set('Authorization', `Bearer ${token}`).send({ sku: 's1', name: 'item', qty: 1, locationId: 1, userId: 1 });
    expect(create.status).toBe(201);
    const id = create.body.id;
    const get = await request(app).get(`/api/items/${id}`).set('Authorization', `Bearer ${token}`);
    expect(get.status).toBe(200);
    expect(get.body.name).toBe('item');
  });
});
