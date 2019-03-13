const { fetchAllArticles } = require('../models/articlesModel');

exports.sendAllArticles = (req, res, next) => {
  console.log(req.query);
  const { author, topic } = req.query; // Same as req.query = { author : 'butter_bridge' }
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions.topic = topic;


  const sort = req.query.sortby || 'created_at';


  // console.log(whereConditions, sort);

  fetchAllArticles(whereConditions, sort).then((articles) => {
    res.status(200).send(articles);
  })
    .catch(err => console.log(err));
};
