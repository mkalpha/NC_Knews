const fs = require('fs');

exports.fetchAllEndpoints = () => new Promise((resolve, reject) => {
  fs.readFile('./endPoints.json', 'utf8', (err, endPoints) => {
    if (err) reject({ msg: 'Error' });
    resolve(JSON.parse(endPoints));
  });
});