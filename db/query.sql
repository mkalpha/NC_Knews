\c nc_news_test

-- SELECT  articles.article_id,articles.title,articles.author,articles.topic,articles.created_at,articles.votes, COUNT (comments.article_id) AS comment_count FROM articles
-- LEFT JOIN comments ON articles.article_id = comments.article_id
-- WHERE articles.article_id = '1'
-- GROUP BY articles.article_id

-- SELECT * FROM articles
-- WHERE article_id ='1';

-- UPDATE articles
-- SET votes = votes + 20
-- WHERE article_id ='1';

-- SELECT * FROM articles
-- WHERE article_id ='1';

SELECT * FROM articles;

SELECT * FROM comments;

SELECT * FROM users



