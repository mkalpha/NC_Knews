const {
  fetchAllArticles, postArticle, fetchSingleArticle, patchArticle, deleteArticle, fetchComments, postComment,
} = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions.topic = topic;

  const sort = req.query.sortby || 'created_at';
  const orderby = req.query.orderby || 'desc';
  fetchAllArticles(whereConditions, sort, orderby).then((articles) => {
    res.status(200).send(articles); // need to destructure this ({ articles }) but will break lots of tests come back to it
  })
    .catch(next);
};

exports.addArticle = (req, res, next) => {
  const article = req.body;
  postArticle(article)
    .then((newArticle) => {
      res.status(201).send({ newArticle });
    })
    .catch(next);
};

exports.sendArticle = (req, res, next) => {
  const article = req.params;
  fetchSingleArticle(article)
    .then((returnedArticle) => {
      res.status(200).send({ returnedArticle });
    })
    .catch(next);
};

exports.changeArticle = (req, res, next) => {
  const article_id = req.params;
  const votes = req.body;
  patchArticle(votes, article_id)
    .then((returnedArticle) => {
      res.status(201).send({ returnedArticle });
    })
    .catch(next);
};

exports.removeArticle = (req, res, next) => {
  const article = req.params;
  deleteArticle(article)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const article = req.params;
  const sort = req.query.sortby || 'created_at';
  const order = req.query.order || 'desc';
  fetchComments(article, sort, order)
    .then((articleComments) => {
      res.status(200).send({ articleComments });
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const { username, body } = req.body;
  const whereConditions = {};
  whereConditions.article_id = req.params.article_id;
  whereConditions.author = username;
  whereConditions.body = body;

  postComment(whereConditions)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};
