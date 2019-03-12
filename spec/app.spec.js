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
    // it('POST tests that a non unique slug will not be added to the topics table', () => {
    //     const topicToPost = {
    //         slug: 'mitch',
    //         descrription: 'test description'
    //     };
    //     return request.post('/api/topics')
    //         .send(topicToPost)
    //         .expect(400)
    // });
  });
});
