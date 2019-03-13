\c nc_news_test

SELECT  articles.article_id,articles.title,articles.author,articles.topic,articles.created_at,articles.votes, COUNT (comments.article_id) AS comment_count FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
WHERE articles.author = 'butter_bridge'
GROUP BY articles.article_id



