function createArticles(arr) {
  arr.map((item) => {
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
  arr.map((item) => {
    result[item.title] = item.article_id;
  });

  return result;
}

function commentsIdReference(dictionary, arr) {
  arr = createArticles(arr);

  return arr.map((comment) => {
    const {
      body, belongs_to, created_by, votes, created_at,
    } = comment;

    const author = created_by;

    return {
      body, votes, created_at, author, article_id: dictionary[belongs_to],
    };
  });
}

module.exports = { createArticles, createCommentsDictionary, commentsIdReference };
