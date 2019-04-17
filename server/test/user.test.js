// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server');

// const should = chai.should();
// chai.use(chaiHttp);
// let accessToken;

// const { apiURL } = global;

// describe('Users routes', () => {
//     describe('get test message', () => {
//         it('should output user works to the screen', done => {
//             chai.request(server)
//                 .get(`${apiURL}users/test`)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('status');
//                     res.body.status.should.equal(200);
//                     done();
//                 });
//         });
//     });
// });
