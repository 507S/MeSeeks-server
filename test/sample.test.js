const chai = require('chai');
const app = require('../app'); // Import the Express app
const request = require('supertest');

const expect = chai.expect;
before((done) => {
  // Start the server on a separate port for testing
  server = app.listen(3001, done);
});

after((done) => {
  server.close(done); // Stop the server after tests
});
describe('Basic Express Tests', () => {
  it('should return "Hello, World!" for the root path', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          console.error(err);
          return done(err);
        }

        expect(res.status).to.equal(200); // Use expect for status assertion
        expect(res.text).to.equal('Hello, World!');
        done();
      });
  });
});