const app = require('./app');

const port = process.env.PORT || 9090;
// eslint-disable-next-line
app.listen(port, () => { console.log(`Server running on ${port}`); });
