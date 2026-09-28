import { Generated, Insertable, Selectable } from 'kysely';

export type ArticleTable = {
  articleId: Generated<number>;
  title: string;
  contents: string;
};

export type Article = Selectable<ArticleTable>;
export type NewArticle = Insertable<ArticleTable>;

export type Database = { article: ArticleTable };
