const { fetchAllArticles } = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  console.log('in articles controller');
  fetchAllArticles().then((articles) => {
    console.log(articles);
    res.status(200).send(articles);
  })
    .catch(err => console.log(err));
};
