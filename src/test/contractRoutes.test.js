const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Assuming your main app file is named 'server.js'
const should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

describe('Contract Routes', () => {

    // POST /setUser
    describe('POST /setUser', () => {
        it('it should set a new user', (done) => {
            let user = {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: 1234567890,
                branch: "CS",
                rollNo: "12345678"
            };
            chai.request(server)
                .post('/setUser')
                .field('name', user.name)
                .field('email', user.email)
                .field('phone', user.phone.toString())
                .field('branch', user.branch)
                .field('rollNo', user.rollNo)
                .attach('image', fs.readFileSync('src/test/lighthouse.png'), 'image.png')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });

    // GET /getUserByRollNo/:rollNo
    describe('GET /getUserByRollNo/:rollNo', () => {
        it('it should get user details by roll number', (done) => {
            let rollNo = '12345678';
            chai.request(server)
                .get('/getUserByRollNo/' + rollNo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('phone');
                    res.body.data.should.have.property('branch');
                    res.body.data.should.have.property('fileCID');
                    done();
                });
        });
    });

    // PUT /setApprovalStatus/:rollNo
    describe('PUT /setApprovalStatus/:rollNo', () => {
        it('it should set the approval status of a user', (done) => {
            let rollNo = '12345678';
            chai.request(server)
                .put('/setApprovalStatus/' + rollNo)
                .send({ status: true })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });

    // GET /isUserApproved/:rollNo
    describe('GET /isUserApproved/:rollNo', () => {
        it('it should get the approval status of a user', (done) => {
            let rollNo = '12345678';
            chai.request(server)
                .get('/isUserApproved/' + rollNo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.data.should.have.property('approved');
                    done();
                });
        });
    });

    // DELETE /deleteUser/:rollNo
    describe('DELETE /deleteUser/:rollNo', () => {
        it('it should delete the user', (done) => {
            let rollNo = '12345678';
            chai.request(server)
                .delete('/deleteUser/' + rollNo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });

    // GET /getAllUsersWithStatus
    describe('GET /getAllUsersWithStatus', () => {
        it('it should get all users with their approval statuses', (done) => {
            chai.request(server)
                .get('/getAllUsersWithStatus')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.data.should.have.property('rollNumbers').that.is.an('array');
                    res.body.data.should.have.property('statuses').that.is.an('array');
                    done();
                });
        });
    });

});
