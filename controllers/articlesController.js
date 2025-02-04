const {
  fetchAllArticles,
  postArticle,
  fetchSingleArticle,
  patchArticle,
  deleteArticle,
  fetchComments,
  postComment,
} = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  const whereConditions = {};

  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions.topic = topic;

  const sort = req.query.sortby || 'created_at';
  const orderby = req.query.orderby || 'desc';

  if (orderby !== 'desc' && orderby !== 'asc') {
    next({ msg: 'Bad Request: Order by should be asc or desc', status: 400 });
  } else {
    fetchAllArticles(whereConditions, sort, orderby)
      .then((articles) => {
        if (articles.length > 0) {
          res.status(200).send({ articles });
        } else {
          next({ msg: 'Not Found', status: 404 });
        }
      })
      .catch(next);
  }
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
    .then((newArticle) => {
      if (newArticle.length > 0) return res.status(200).send({ article: newArticle });
      return Promise.reject({ msg: 'Article Not Found', status: 404 });
    })
    .catch(next);
};

exports.changeArticle = (req, res, next) => {
  const article_id = req.params;
  const votes = req.body;

  if (!votes.inc_votes) {
    next({
      msg: 'Bad Request: Invalid Object Key Should Be "inc_votes"',
      status: 400,
    });

  // eslint-disable-next-line
  } else if (isNaN(votes.inc_votes)) {
    next({ msg: 'Bad Request: Votes Should Be An Integer', status: 400 });
  } else if (Object.keys(votes).length > 1) {
    next({
      msg: 'Bad Request: Votes Object can only contain one entry',
      status: 400,
    });
  } else {
    patchArticle(votes, article_id)
      .then((returnedArticle) => {
        res.status(200).send({ returnedArticle });
      })
      .catch(next);
  }
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
  const orderby = req.query.orderby || 'desc';
  fetchComments(article, sort, orderby)
    .then((articleComments) => {
      if (articleComments.length > 0) return res.status(200).send({ articleComments });
      return next({ msg: 'No Comments for this Article', status: 400 });
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
