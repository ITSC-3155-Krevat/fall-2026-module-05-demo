import { describe, expect, it } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/index.js';

const request = supertest(app);

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
      const res = await request.post('/articles').send({
        title: 'Another article',
        contents: 'This is yet another article',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        articleId: expect.any(Number),
        title: 'Another article',
        contents: 'This is yet another article',
      });
      const { articleId } = res.body;
      const getRes = await request.get(`/articles/${articleId}`);
      expect(getRes.statusCode).toEqual(200);
      expect(getRes.body).toEqual({
        articleId,
        title: 'Another article',
        contents: 'This is yet another article',
      });
    });
  });
});
