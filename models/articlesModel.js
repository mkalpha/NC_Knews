const connection = require('../db/connection');

exports.fetchAllArticles = (whereConditions, sort) => connection
  .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
  .count('comments.article_id as comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .where(whereConditions)
  .orderBy(sort, 'asc')
  .groupBy('articles.article_id')
  .returning('*')
  .catch(err => console.log(err));

exports.postArticle = (article) => {
  console.log(article);
  return connection('articles').insert(article).returning('*');
};
