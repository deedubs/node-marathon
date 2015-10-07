
var expect = require('chai').expect;
var nock = require('nock');
var Marathon = require('..');

describe('Marathon', function () {
    var marathon;

    before(function () {

        marathon = new Marathon('http://galvatron.ops.keatonrow.com:8080/v2/apps');
    });

    it('should be able to load an applications details', function (done) {

        nock('http://galvatron.ops.keatonrow.com:8080/')
            .get('/v2/apps/my/test/application')
            .reply(200, require('./fixtures/get.json'));

        marathon.get('/my/test/application', function (err, application) {

            expect(application).to.have.property('id');
            expect(application).to.have.property('instances');

            done();
        });
    });

    it('should handle if its unable to find an applications details', function (done) {

        nock('http://galvatron.ops.keatonrow.com:8080/')
            .get('/v2/apps/my/test/404')
            .reply(404);

        marathon.get('/my/test/404', function (err, application) {

            expect(err)
                .to.have.property('message')
                .to.equal('Unable to load: /my/test/404');

            done();
        });
    });
});
