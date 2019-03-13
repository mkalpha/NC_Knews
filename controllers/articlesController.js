const {
  fetchAllArticles, postArticle, fetchSingleArticle, patchArticle, deleteArticle, fetchComments,
} = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions.topic = topic;

  const sort = req.query.sortby || 'created_at';

  fetchAllArticles(whereConditions, sort).then((articles) => {
    res.status(200).send(articles);
  })
    .catch(err => console.log(err));
};

exports.addArticle = (req, res, next) => {
  const article = req.body;
  postArticle(article)
    .then((newArticle) => {
      res.status(201).send({ newArticle });
    });
};

exports.sendArticle = (req, res, next) => {
  const article = req.params;
  fetchSingleArticle(article)
    .then((returnedArticle) => {
      res.status(200).send({ returnedArticle });
    });
};

exports.changeArticle = (req, res, next) => {
  const article_id = req.params;
  const votes = req.body;
  patchArticle(votes, article_id)
    .then((returnedArticle) => {
      res.status(201).send({ returnedArticle });
    });
};

exports.removeArticle = (req, res, next) => {
  const article = req.params;
  deleteArticle(article)
    .then(() => {
      res.status(204).send();
    });
};

exports.getComments = (req, res, next) => {
  const article = req.params;
  const sort = req.query.sortby || 'created_at';
  const order = req.query.order || 'desc';
  fetchComments(article, sort, order)
    .then((articleComments) => {
      res.status(200).send({ articleComments });
    });
};
