const {
  fetchAllArticles, postArticle, fetchSingleArticle, patchArticle,
} = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  const { author, topic } = req.query; // Same as req.query = { author : 'butter_bridge' }
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
