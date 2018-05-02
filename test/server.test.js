const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('API', function() {

    it('should 200 on GET requests', function() {
        return chai.request(app)
            .get('/api')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
            });
    });

    it('should reject request with missing email field', () => {
        const email = {
            name: 'Test emailer',
            message: 'This is just a test'
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with missing name field', () => {
        const email = {
            email: 'asdf@example.com',
            message: 'This is just a test'
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with missing message field', () => {
        const email = {
            email: 'asdf@example.com',
            name: 'whoever exampleman'
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    })

    it('should reject request with non-string message field', () => {
        const email = {
            email: 'asdf@example.com',
            name: 'whoever exampleman',
            message: 45
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with non-string name field', () => {
        const email = {
            email: 'asdf@example.com',
            name: 35,
            message: 'asdfasdf'
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with non-string email field', () => {
        const email = {
            email: 34,
            name: 'asdf asdf',
            message: 'asdfasdf'
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with non-string org field', () => {
        const email = {
            email: 'asdf@example.com',
            name: 'asdfase',
            message: 'asdfasdf',
            org: 22
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject request with non-string phone field', () => {
        const email = {
            email: 'asdf@example.com',
            name: 'asdfa asdf',
            message: 'asdfasdf',
            phone: 3252
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    });

    it('should reject invalid email address', () => {
        const email = {
            email: 'asdf@',
            name: 'asdfa asdf',
            message: 'asdfasdf',
        };

        return chai.request(app)
            .post('/api/sendmail')
            .send(email)
            .then(res => {
                res.should.have.status(422);
                res.should.be.json;
            })
    })
});