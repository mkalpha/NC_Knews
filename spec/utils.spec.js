process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { createArticles, createCommentsDictionary, commentsIdReference } = require('../db/utils');


describe('createArticles', () => {
  it('Tests that when passed an array of one object it will convert the timeStamp to a YYYY-MM-DD format', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const expected = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: '2018-11-15',
      votes: 100,
    }];
    expect(createArticles(input)).to.eql(expected);
  });
  it('Tests that when an array of multiple objects it will change the timestamp on each object', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    },
    {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Call',
      created_at: 1416140514171,
    }];
    const expected = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: '2018-11-15',
      votes: 100,
    },
    {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Call',
      created_at: '2014-11-16',
    }];
    expect(createArticles(input)).to.eql(expected);
  });
});
describe('createCommentsDictionary', () => {
  it('Test that for an array of one object it will return an object with the article name as a key and the id as the pair', () => {
    const input = [{ article_id: 1, title: "They're not exactly dogs, are they?" }];
    const expected = { "They're not exactly dogs, are they?": 1 };
    expect(createCommentsDictionary(input)).to.eql(expected);
  });
  it('Test that if it receives an array with multiple objects it will return an object with multiple key vale pairs ', () => {
    const input = [{ article_id: 1, title: "They're not exactly dogs, are they?" }, { article_id: 2, title: 'test Title' }];
    const expected = { "They're not exactly dogs, are they?": 1, 'test Title': 2 };
    expect(createCommentsDictionary(input)).to.eql(expected);
  });
});
describe('commentsIdReference', () => {
  it('Tests sending in a dictionary object and an array of comment information, it should return an array with article_id ', () => {
    const input = [{
      body: 'test Body',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }];
    const dictionary = { 'Living in the shadow of a great man': 1 };
    const expected = [{
      body: 'test Body',
      article_id: 1,
      author: 'icellusedkars',
      votes: 100,
      created_at: '2015-11-23',
    }];
    expect(commentsIdReference(dictionary, input)).to.eql(expected);
  });
});
