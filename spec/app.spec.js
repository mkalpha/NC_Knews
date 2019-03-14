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
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.keys('slug', 'description');
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
          expect(res.body).to.have.keys('slug', 'description');
        });
    });
  });
  describe('/api/articles', () => {
    it('GET status 200. returns an array', () => request.get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body[0].created_at).to.eql('2018-11-15T00:00:00.000Z');
        expect(res.body[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('GET status 200. results should be default sort of date and ordered by defaults to descending', () => request.get('/api/articles/')
      .expect(200)
      .then((res) => {
        expect(res.body[0].article_id).to.eql(1);
        expect(res.body[11].article_id).to.eql(12);
      }));
    it('GET status 200 QUERIES should filter the articles by the username', () => request.get('/api/articles?author=butter_bridge&orderby=asc')
      .expect(200)
      .then((res) => {
        expect(res.body[0].author).to.eql('butter_bridge');
        expect(res.body[2].author).to.eql('butter_bridge');
      }));
    it('GET status 200 QUERIES should filter by topic', () => {
      request.get('/api/articles?topic=mitch&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].topic).to.eql('mitch');
          expect(res.body[8].topic).to.eql('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort author - defaults to Date', () => request.get('/api/articles?sortby=author&orderby=asc')
      .expect(200)
      .then((res) => {
        expect(res.body[0].author).to.eql('butter_bridge');
        expect(res.body[11].author).to.eql('rogersop');
      }));
    it('GET status 200 QUERIES should be able to sort by title - defaults to Date', () => {
      request.get('/api/articles?sortby=title&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].title).to.eql('A');
          expect(res.body[11].title).to.eql('Z');
        });
    });
    it('GET status 200 QUERIES should be able to sort by article_id - defaults to Date', () => {
      request.get('/api/articles?sortby=article_id&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].article_id).to.eql(1);
          expect(res.body[11].article_id).to.eql(12);
        });
    });
    it('GET status 200 QUERIES should be able to sort by topic - defaults to Date', () => {
      request.get('/api/articles?sortby=topic&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].topic).to.eql('cats');
          expect(res.body[11].topic).to.eql('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort by votes - defaults to Date', () => {
      request.get('/api/articles?sortby=votes&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].votes).to.eql(0);
          expect(res.body[11].votes).to.eql(100);
        });
    });
    it('GET status 200 QUERIES should be able to sort by comment count - defaults to Date', () => {
      request.get('/api/articles?sortby=comment_count&orderby=asc')
        .expect(200)
        .then((res) => {
          expect(res.body[0].comment_count).to.eql('0');
          expect(res.body[11].comment_count).to.eql('13');
        });
    });
    it('GET Status 200 params article_id', () => request.get('/api/articles/1')
      .expect(200)
      .then((res) => {
        expect(res.body.returnedArticle[0].article_id).to.eql(1);
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
    it('PATCH gives 201  status, updates the article and returns and returns an object as it will appear in the db', () => {
      const votesObject = { inc_votes: 1 };
      return request.patch('/api/articles/1').send(votesObject)
        .expect(201)
        .then((res) => {
          expect(res.body.returnedArticle[0].votes).to.eql(101);
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
        expect(res.body.articleComments[0].votes).to.eql(100);
        expect(res.body.articleComments[12].votes).to.eql(-100);
      }));
    it('GET status 200 QUERIES should be able to order by', () => request.get('/api/articles/1/comments?sortby=author&order=asc')
      .expect(200)
      .then((res) => {
        expect(res.body.articleComments[0].votes).to.eql(14);
        expect(res.body.articleComments[12].votes).to.eql(100);
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
  describe('/api/comments PATCH DELETE', () => {
    it('PATCH gives 201  status, updates the comment and returns and returns an object as it will appear in the db', () => {
      const votesObject = { inc_votes: 1000 };
      return request.patch('/api/comments/1').send(votesObject)
        .expect(201)
        .then((res) => {
          expect(res.body.returnedComment[0].votes).to.eql(1016);
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
      expect(res.body.user[0].username).to.eql('butter_bridge');
    }));
  describe('Error Handling', () => {
    it('Status 404: Testing error handling for a bad route', () => request.get('/bad-route')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql('Route Not Found');
      }));
    it('POST bad /topics bad request missing field', () => request.post('/api/topics').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.eql('Bad Request');
      }));
    it('POST /articles Bad Request missing field', () => request.post('/api/articles').send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.eql('Bad Request');
      }));
    it('POST /topics test for duplicate entry of primary key slug', () => request.post('/api/topics').send({
      description: 'Test Desription',
      slug: 'mitch',
    }).expect(422)
      .then((res) => {
        expect(res.body.msg).to.eql('Key (slug)=(mitch) already exists.');
      }));
    it('POST /articles test for posting an author which doesnt exist in the Users table', () => request.post('/api/articles').send({
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'ERROR AUTHOR',
      body: 'I find this existence challenging',
    }).expect(422)
      .then((res) => {
        expect(res.body.msg).to.eql('Key (author)=(ERROR AUTHOR) is not present in table "users".');
      }));
    it.only('POST /articles test for posting an topic slug which doesnt exist in the topics table', () => request.post('/api/articles').send({
      title: 'Living in the shadow of a great man',
      topic: 'ERROR TOPIC',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
    }).expect(422)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).to.eql('Key (topic)=(ERROR TOPIC) is not present in table "topics".');
      }));
  });
});
