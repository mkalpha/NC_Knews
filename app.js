const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');


app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route Not Found' });
});


module.exports = app;
