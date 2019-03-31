const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');


app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route Not Found' });
});

app.use((err, req, res, next) => {
  const codes = ['23502', '22P02', 400, '42703'];
  if (codes.includes(err.code) || codes.includes(err.status)) res.status(400).send({ status: 400, msg: err.msg || 'Bad Request' });
  else next(err);
});

app.use((err, req, res, next) => {
  const codes = ['23505', '23503'];
  if (codes.includes(err.code)) res.status(422).send({ status: 422, msg: err.detail || 'Unprocessable Entity' });
  else next(err);
});

app.use((err, req, res, next) => {
  const codes = [404];
  if (codes.includes(err.code) || codes.includes(err.status)) res.status(404).send({ status: 404, msg: err.detail || 'Not Found' });
  else next(err);
});

app.use((req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
