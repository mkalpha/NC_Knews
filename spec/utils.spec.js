const { expect } = require('chai');
const { createArticles } = require('../db/utils');


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
