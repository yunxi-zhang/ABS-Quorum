let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('Bank', () => {
    /*
      * Test the /GET route
      */
    describe('/GET Buyer Balance', () => {
        it('it should GET the balance of a buyer', (done) => {
            chai.request(server)
                .get('/buyerBalance')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});