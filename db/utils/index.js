function createArticles(arr) {
  arr.forEach((item) => {
    let createdDate = item.created_at;
    createdDate = new Date(createdDate);
    const psqlYear = createdDate.getFullYear();
    let psqlMonth = createdDate.getMonth() + 1;
    psqlMonth = psqlMonth.toString();
    psqlMonth = psqlMonth.padStart(2, '0');
    const psqlDay = createdDate.getDate();
    const psqlDate = `${psqlYear}-${psqlMonth}-${psqlDay}`;

    item.created_at = psqlDate;
  });

  return arr;
}

function createCommentsDictionary(arr) {
  const result = {};
  arr.forEach((item, index) => {
    result[item.title] = item.article_id;
  });

  return result;
}

module.exports = { createArticles, createCommentsDictionary };
