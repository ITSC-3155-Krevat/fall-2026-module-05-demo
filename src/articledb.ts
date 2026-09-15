export type Article = {
  articleId: number;
  title: string;
  contents: string;
};

const db: Record<number, Article> = {
  1: {
    articleId: 1,
    title: 'First article',
    contents: 'TypeScript is fun',
  },
  2: {
    articleId: 2,
    title: 'Second article',
    contents: 'TypeScript is hard',
  },
};

export function getAllArticles(): Article[] {
  return Object.values(db);
}

export function getSingleArticle(id: number): Article | undefined {
  const article = db[id];
  if (!article) return undefined;
  return article;
}

export function createArticle(newArticle: Omit<Article, 'articleId'>): Article {
  const articleId = Math.round(Math.random() * 1_000_000);
  const createdArticle: Article = {
    articleId,
    ...newArticle,
  };
  db[articleId] = createdArticle;
  return createdArticle;
}
