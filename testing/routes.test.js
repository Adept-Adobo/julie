const request = require('supertest');
const app = require('../server/app');
const pool = require('../server/db');

afterAll(() => {
  pool.end();
});

describe('Test the product route', () => {
  test('response to GET method for products should be 200', (done) => {
    request(app)
      .get('/api/products')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('response to GET method for products with count query should be 200', (done) => {
    request(app)
      .get('/api/products?count=3')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('response to GET method for products with page and count query should be 200', (done) => {
    request(app)
      .get('/api/products?count=4&page=2')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('response to GET method with invalid queries should still be 200', (done) => {
    request(app)
      .get('/api/products?nothing=rubbish&garbage=nothing')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Test the style route', () => {
  test('response to GET method for styles with valid product id should be 200', (done) => {
    request(app)
      .get('/api/products/1/styles')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  // returns empty array instead of error
  test('response to GET method for styles with invalid num id should still be 200', (done) => {
    request(app)
      .get('/api/products/100000000/styles')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('response to GET method for styles with invalid non-num prod id should be 404', (done) => {
    request(app)
      .get('/api/products/notannumber/styles')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe('Test the related route', () => {
  test('response to GET method for related with valid product id should be 200', (done) => {
    request(app)
      .get('/api/products/1/related')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  // returns empty array instead of error
  test('response to GET method for related with invalid product id should be 200', (done) => {
    request(app)
      .get('/api/products/100000000/styles')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
