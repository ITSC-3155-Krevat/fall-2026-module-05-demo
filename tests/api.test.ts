import { describe, expect, it } from 'vitest';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../src/index.js';

const request = supertest(app);

// The app falls back to 'thisisasecret' when JWT_SECRET is not set.
// We generate a token with the same secret so auth middleware accepts it
// without needing a real user in the database.
const TEST_USER_ID = 1;
const TEST_SECRET = process.env.JWT_SECRET ?? 'thisisasecret';
const TEST_TOKEN = jwt.sign({ sub: TEST_USER_ID }, TEST_SECRET, {
  expiresIn: '1h',
  algorithm: 'HS256',
});

describe('API Integration Tests', () => {
  describe('/health route', () => {
    it('should respond with a healthy response', async () => {
      const res = await request.get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  describe('/articles routes', () => {
    it('should create an article', async () => {
      const res = await request
        .post('/articles')
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({
          title: 'Another article',
          contents: 'This is yet another article',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        articleId: expect.any(Number),
        title: 'Another article',
        contents: 'This is yet another article',
        userId: TEST_USER_ID,
      });
      const { articleId } = res.body;
      const getRes = await request
        .get(`/articles/${articleId}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`);
      expect(getRes.statusCode).toEqual(200);
      expect(getRes.body).toEqual({
        articleId,
        title: 'Another article',
        contents: 'This is yet another article',
        userId: TEST_USER_ID,
      });
    });
  });
});
