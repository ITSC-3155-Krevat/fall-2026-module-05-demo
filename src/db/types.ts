import { Generated } from 'kysely';

export type ArticleTable = {
  articleId: Generated<number>;
  title: string;
  contents: string;
};

export type Database = { article: ArticleTable };
