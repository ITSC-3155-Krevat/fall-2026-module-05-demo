import express from 'express';
import {
  Article,
  createArticle,
  getAllArticles,
  getSingleArticle,
} from './articledb.js';

export const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.locals.requestId = Math.round(Math.random() * 1000);
  next();
});

app.get('/health', function (_, res) {
  res.json({ status: 'ok' });
});

app.get('/articles', function (req, res) {
  console.log('Request ID:', res.locals.requestId);
  const titleContains = req.query.title_contains;
  const articles = getAllArticles();
  if (!titleContains) {
    return res.json(articles);
  }
  const searchTerm = '' + titleContains;
  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return res.json(filteredArticles);
});

app.get('/articles/:articleId', function (req, res) {
  const { articleId } = req.params;
  const articleIdNum = +articleId;
  if (Number.isNaN(articleIdNum)) {
    return res.status(400).json({ error: 'articleId must be a number' });
  }
  const article = getSingleArticle(articleIdNum);
  if (!article) {
    return res.status(404).json({ error: 'article not found' });
  }
  return res.json(article);
});

app.post('/articles', function (req, res) {
  const article = req.body as Partial<Omit<Article, 'articleId'>>;
  if (!article.contents || !article.title) {
    return res.sendStatus(400);
  }
  const { contents, title } = article;
  const newArticle = createArticle({ title, contents });
  res.status(201).json(newArticle);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => console.log('Service started on 8080'));
}
