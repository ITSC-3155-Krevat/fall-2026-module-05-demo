import express from 'express';
import {
  Article,
  createArticle,
  getAllArticles,
  getSingleArticle,
} from './articledb.js';

const app = express();

app.use(express.json());

app.get('/health', function (req, res) {
  res.json({ status: 'ok' });
});

app.get('/articles', function (req, res) {
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
  const article = req.body as Article;
  const newArticle = createArticle(article);
  res.status(201).json(newArticle);
});

app.listen(8080, () => console.log('Service started on 8080'));
