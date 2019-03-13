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
    it('GET status 200. returns an array', () => request.get('/api/articles/')
      .expect(200)
      .then((res) => {
        expect(res.body[3].comment_count).to.eql('2');
        expect(res.body[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('GET status 200 QUERIES should filter the articles by the username', () => request.get('/api/articles?author=butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body[0].author).to.eql('butter_bridge');
        expect(res.body[2].author).to.eql('butter_bridge');
      }));
    it('GET status 200 QUERIES should filter by topic', () => {
      request.get('/api/articles?topic=mitch')
        .expect(200)
        .then((res) => {
          expect(res.body[0].topic).to.eql('mitch');
          expect(res.body[8].topic).to.eql('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort author - defaults to Date', () => request.get('/api/articles?sortby=author')
      .expect(200)
      .then((res) => {
        expect(res.body[0].author).to.eql('butter_bridge');
        expect(res.body[11].author).to.eql('rogersop');
      }));
    it('GET status 200 QUERIES should be able to sort by title - defaults to Date', () => {
      request.get('/api/articles?sortby=title')
        .expect(200)
        .then((res) => {
          expect(res.body[0].title).to.eql('A');
          expect(res.body[11].title).to.eql('Z');
        });
    });
    it('GET status 200 QUERIES should be able to sort by article_id - defaults to Date', () => {
      request.get('/api/articles?sortby=article_id')
        .expect(200)
        .then((res) => {
          expect(res.body[0].article_id).to.eql(1);
          expect(res.body[11].article_id).to.eql(12);
        });
    });
    it('GET status 200 QUERIES should be able to sort by topic - defaults to Date', () => {
      request.get('/api/articles?sortby=topic')
        .expect(200)
        .then((res) => {
          expect(res.body[0].topic).to.eql('cats');
          expect(res.body[11].topic).to.eql('mitch');
        });
    });
    it('GET status 200 QUERIES should be able to sort by votes - defaults to Date', () => {
      request.get('/api/articles?sortby=votes')
        .expect(200)
        .then((res) => {
          expect(res.body[0].votes).to.eql(0);
          expect(res.body[11].votes).to.eql(100);
        });
    });
    it('GET status 200 QUERIES should be able to sort by comment count - defaults to Date', () => {
      request.get('/api/articles?sortby=comment_count')
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
});
