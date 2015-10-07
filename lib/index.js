
var http = require('http');
var path = require('path');
var assert = require('assert');


/**
 * Marathon
 *
 * @class
 */
function Marathon(url) {

    this.url = url;
}

/**
 * Retrieve a Marathon application
 *
 * @param {string}   applicationId Application to load
 * @param {function} cb
 */
Marathon.prototype.get = function(applicationId, callback) {

    http
        .get(this.url + applicationId, function (res) {

            res.setEncoding('utf8');

            if (res.statusCode > 399) {

                callback(new Error('Unable to load: ' +applicationId));
            }

            res.on('data', function (body) {

                var application = JSON.parse(body).app;

                callback(null, application);
            });

            res.on('error', callback.bind(this));
        })
        .on('error', function (err) {

            callback(null);
        });
};

module.exports = Marathon;
