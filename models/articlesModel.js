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

exports.postArticle = article => connection('articles').insert(article).returning('*');

exports.fetchSingleArticle = article => connection.select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
  .count('comments.article_id as comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .where('articles.article_id', article.article_id)
  .groupBy('articles.article_id')
  .returning('*');
