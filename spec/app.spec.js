process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);


const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('api/topics', () => {
    it('GET status 200. returns an array of topics with slug and desciption', () => request.get('/api/topics').expect(200)
      .then((res) => {
        expect(res.body.topics[0]).to.be.an('object');
        expect(res.body.topics[0]).to.have.keys('slug', 'description');
      }));
    it('POST gives 201 status, returns the new object as it is in db', () => {
      const topicToPost = {
        slug: 'testSlug',
        description: 'Test Description',
      };
      return request.post('/api/topics')
        .send(topicToPost)
        .expect(201)
        .then((res) => {
          expect(res.body.newTopic).to.have.keys('slug', 'description');
        });
    });
  });
  describe('/api/articles', () => {
    it('GET status 200. returns an array', () => request.get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].created_at).to.equal('2018-11-15T00:00:00.000Z');
        expect(res.body.articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('GET status 200. results should be default sort of date and ordered by defaults to descending', () => request.get('/api/articles/')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(1);
        expect(res.body.articles[11].article_id).to.equal(12);
      }));
    it('GET status 200 QUERIES should filter the articles by the username', () => request.get('/api/articles?author=butter_bridge&orderby=asc')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].author).to.equal('butter_bridge');
        expect(res.body.articles[2].author).to.equal('butter_bridge');
      }));
    it('GET status 200 QUERIES should filter by topic', () => {
      request.get('/api/articles?topic=mitch&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[8].topic).to.equal('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort author - defaults to Date', () => request.get('/api/articles?sortby=author&orderby=asc')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].author).to.equal('butter_bridge');
        expect(res.body.articles[11].author).to.equal('rogersop');
      }));
    it('GET status 200 QUERIES should be able to sort by title - defaults to Date', () => {
      request.get('/api/articles?sortby=title&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].title).to.equal('A');
          expect(res.body.articles[11].title).to.equal('Z');
        });
    });
    it('GET status 200 QUERIES should be able to sort by article_id - defaults to Date', () => {
      request.get('/api/articles?sortby=article_id&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].article_id).to.equal(1);
          expect(res.body.articles[11].article_id).to.equal(12);
        });
    });
    it('GET status 200 QUERIES should be able to sort by topic - defaults to Date', () => {
      request.get('/api/articles?sortby=topic&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].topic).to.equal('cats');
          expect(res.body.articles[11].topic).to.equal('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort by votes - defaults to Date', () => {
      request.get('/api/articles?sortby=votes&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].votes).to.equal(0);
          expect(res.body.articles[11].votes).to.equal(100);
        });
    });
    it('GET status 200 QUERIES should be able to sort by comment count - defaults to Date', () => {
      request.get('/api/articles?sortby=comment_count&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].comment_count).to.equal('0');
          expect(res.body.articles[11].comment_count).to.equal('13');
        });
    });
    it('GET Status 200 params article', () => request.get('/api/articles/1')
      .expect(200)
      .then((res) => {
        expect(res.body.article[0].article_id).to.equal(1);
      }));
  });
  describe('/api/articles POST', () => {
    it('POST gives 201 status, returns the new object as it is in db', () => {
      const articleToPost = {
        title: 'testTitle',
        body: 'testBody',
        topic: 'mitch',
        author: 'butter_bridge',
      };
      return request.post('/api/articles').send(articleToPost)
        .expect(201)
        .then((res) => {
          expect(res.body.newArticle[0]).to.have.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at');
        });
    });
  });
  describe('/api/articles PATCH', () => {
    it('PATCH gives 200  status, updates the article and returns and returns an object as it will appear in the db', () => {
      const votesObject = { inc_votes: 1 };
      return request.patch('/api/articles/1').send(votesObject)
        .expect(200)
        .then((res) => {
          expect(res.body.returnedArticle[0].votes).to.equal(101);
        });
    });
  });
  describe('/api/articles  DELETE', () => {
    it('DELETE gives 204', () => request.delete('/api/articles/1')
      .expect(204));
  });
  describe('/api/articles/comments', () => {
    it('GET status 200 it should return the comments for an article', () => request.get('/api/articles/1/comments')
      .expect(200)
      .then((res) => {
        expect(res.body.articleComments).to.have.length(13);
      }));
    it('GET status 200 QUERIES should be able to sort defaults to Date', () => request.get('/api/articles/1/comments?sortby=votes')
      .expect(200)
      .then((res) => {
        expect(res.body.articleComments[0].votes).to.equal(100);
        expect(res.body.articleComments[12].votes).to.equal(-100);
      }));
    it('GET status 200 QUERIES should be able to order by', () => request.get('/api/articles/1/comments?sortby=author&orderby=asc')
      .expect(200)
      .then((res) => {
        expect(res.body.articleComments[0].votes).to.equal(14);
        expect(res.body.articleComments[12].votes).to.equal(100);
      }));
    it('POST Status 201 returns the new object as it is in db', () => {
      const commentToPost = {
        body: 'testBody',
        username: 'butter_bridge',
      };
      return request.post('/api/articles/1/comments').send(commentToPost)
        .expect(201)
        .then((res) => {
          expect(res.body.newComment[0]).to.have.keys('comment_id', 'body', 'votes', 'author', 'created_at', 'article_id');
        });
    });
  });
  it('Query 404 if topic doesnt exist on articles query', () => request.get('/api/articles?topic=error')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).to.equal('Not Found');
    }));
  describe('/api/comments PATCH DELETE', () => {
    it('PATCH gives 200  status, updates the comment and returns and returns an object as it will appear in the db', () => {
      const votesObject = { inc_votes: 1000 };
      return request.patch('/api/comments/1').send(votesObject)
        .expect(200)
        .then((res) => {
          expect(res.body.returnedComment[0].votes).to.equal(1016);
        });
    });
    it('DELETE gives 204', () => request.delete('/api/comments/1')
      .expect(204));
  });
  describe('/api/user', () => {
    it('GET 200 should return an array of objects of all the users', () => request.get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body.users).to.have.length(3);
        expect(res.body.users[0]).to.have.keys('username', 'avatar_url', 'name');
      }));
  });
  it('POST should respond with the posted user', () => {
    const newUser = {
      username: 'testUser',
      avatar_url: 'http://image.com/picture.jpg',
      name: 'Test Name',
    };
    return request.post('/api/users').send(newUser)
      .expect(200)
      .then((res) => {
        expect(res.body.user[0]).to.have.keys('username', 'avatar_url', 'name');
      });
  });
  it('GET 200 should return a single user from params', () => request.get('/api/users/butter_bridge')
    .expect(200)
    .then((res) => {
      expect(res.body.user[0].username).to.equal('butter_bridge');
    }));
  describe('Error Handling', () => {
    it('Status 404: Testing error handling for a bad route', () => request.get('/bad-route')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('Route Not Found');
      }));
    it('POST bad /topics bad request missing field', () => request.post('/api/topics').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('POST /articles Bad Request missing field', () => request.post('/api/articles').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('POST /topics test for duplicate entry of primary key slug', () => request.post('/api/topics').send({
      description: 'Test Desription',
      slug: 'mitch',
    }).expect(422)
      .then((res) => {
        expect(res.body.msg).to.equal('Key (slug)=(mitch) already exists.');
      }));
    it('POST /articles test for posting an author which doesnt exist in the Users table', () => request.post('/api/articles').send({
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'ERROR AUTHOR',
      body: 'I find this existence challenging',
    }).expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Key (author)=(ERROR AUTHOR) is not present in table "users".');
      }));
    it('POST /articles test for posting an topic slug which doesnt exist in the topics table', () => request.post('/api/articles').send({
      title: 'Living in the shadow of a great man',
      topic: 'ERROR TOPIC',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
    }).expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Key (topic)=(ERROR TOPIC) is not present in table "topics".');
      }));
    it('GET /articles:article_id Status 400 when passed an invalid article_id', () => request.get('/api/articles/AAAAA')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('GET /articles:article_id Status 404 when passed a valid article_id but which isnt in the db', () => request.get('/api/articles/999999')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Not Found');
      }));
    it('PATCH /articles:article_id Status 400 when the is no inc_votes on req.body', () => request.patch('/api/articles/1').send({ Dog: 1 })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request: Invalid Object Key Should Be "inc_votes"');
      }));
    it('PATCH /articles:article_id Status 400 where the value is invalid', () => request.patch('/api/articles/1').send({ inc_votes: 'cat' })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request: Votes Should Be An Integer');
      }));
    it('PATCH /articles:article_id Status 400 where there is more than one property on the object', () => request.patch('/api/articles/1').send({ inc_votes: 1, name: 'mitch' })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request: Votes Object can only contain one entry');
      }));
    it('GET /api/articles Bad Queries Sort by a column that doesnt exist', () => request.get('/api/articles?sortby=badsortby')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('GET /api/articles Bad Queries orderby !== asc or desc', () => request.get('/api/articles?orderby=badorderby')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request: Order by should be asc or desc');
      }));
    it('POST /api/articles/1/comment invalid', () => request.post('/api/articles/1/comments').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('PATCH `/api/comments/:comment_id invalid ID', () => request.patch('/api/comments/A').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('GET Bad queries aurhor is not in the database', () => request.get('/api/articles/a/comments')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('GET Bad queries author is in the database but no comments', () => request.get('/api/articles/4/comments')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('No Comments for this Article');
      }));
    it('GET invalid user name for api/users/:username', () => request.get('/api/users/BADNAME')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Not Found');
      }));
    it('POST username that already exists /api/users', () => request.post('/api/users').send({
      username: 'butter_bridge',
      avatar_url: '',
      name: 'test',
    })
      .expect(422)
      .then((res) => {
        expect(res.body.msg).to.equal('Key (username)=(butter_bridge) already exists.');
      }));
    it('POST missing fields for /api/users', () => request.post('/api/users').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Bad Request');
      }));
    it('GET author is not in the database', () => request.get('/api/articles?author=notanauthor')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Not Found');
      }));
    it('BAD METHOD on topics PATCH Status 405', () => request.patch('/api/topics')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Method Not Allowed');
      }));
    it('BAD METHOD on topics POST Status 405', () => request.post('/api/comments')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Method Not Allowed');
      }));
    it('BAD METHOD on article_id/Comments PATCH Status 405', () => request.patch('/api/articles/1/comments')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Method Not Allowed');
      }));
    it('BAD METHOD on userRouter PATCH Status 405', () => request.patch('/api/users')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Method Not Allowed');
      }));
  });
});
