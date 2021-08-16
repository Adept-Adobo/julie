const request = require('supertest');
const { Client } = require('pg');
const app = require('../server/app');
const {
  host, user, database, password, port,
} = require('../config');

const client = new Client({
  host,
  user,
  database,
  password,
  port,
});

test('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

beforeAll(() => {
  client.connect();
});

afterAll((done) => {
  client.end(done);
});

describe('Test the product route', () => {
  test('response to GET method for products should be 200', () => {
    request(app)
      .get('/api/products')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('response to GET method for products with count query should be 200', () => {
    request(app)
      .get('/api/products?count=3')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('response to GET method for products with page and count query should be 200', () => {
    request(app)
      .get('/api/products?count=4&page=2')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('Test the style route', () => {
  test('response to GET method for styles with valid product id should be 200', () => {
    request(app)
      .get('/api/products/1/styles')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('response to GET method for styles with invalid product id should be 404', () => {
    request(app)
      .get('/api/products/100000000/styles')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('Test the related route', () => {
  test('response to GET method for related with valid product id should be 200', () => {
    request(app)
      .get('/api/products/1/related')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('response to GET method for related with invalid product id should be 404', () => {
    request(app)
      .get('/api/products/100000000/styles')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
