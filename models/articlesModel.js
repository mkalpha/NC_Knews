const connection = require('../db/connection');

exports.fetchAllArticles = (whereConditions, sort, order) => connection
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

exports.patchArticle = (votes, article_id) => connection('articles').where('article_id', article_id.article_id).increment('votes', votes.inc_votes).returning('*')
  .catch(err => console.log(err));

exports.deleteArticle = (article => connection('articles').where('article_id', article.article_id).del()
  .catch(err => console.log(err)));

exports.fetchComments = (article, sort, order) => connection('comments').select('comment_id', 'votes', 'created_at', 'author', 'body', 'article_id').where('article_id', article.article_id).orderBy(sort, order)
  .returning('*');

exports.postComment = comment => connection('comments').insert(comment).returning('*');
