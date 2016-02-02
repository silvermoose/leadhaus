var pg = require('pg').native,
    //config = require('./config'),
    Q = require('q'),
    winston = require('winston'),
    databaseURL = "postgres://yuiztbkchhoqop:oKokli-_a1s9mRzO3TmnDC0VDH@ec2-54-227-249-166.compute-1.amazonaws.com:5432/d1i361s4l12e55";
    //databaseURL = config.databaseURL;

/**
 * Utility function to execute a SQL query against a Postgres database
 * @param sql
 * @param values
 * @param singleItem
 * @returns {promise|*|Q.promise}
 */
exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        typeof values !== 'undefined' ? console.log(sql, values) : console.log(sql);
    }

    var deferred = Q.defer();

    pg.connect(databaseURL, function (err, conn, done) {
        if (err) return deferred.reject(err);
        try {
            conn.query(sql, values, function (err, result) {
                done();
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(singleItem ? result.rows[0] : result.rows);
                }
            });
        }
        catch (e) {
            done();
            deferred.reject(e);
        }
    });

    return deferred.promise;

};

exports.close = function() {
    pg.end();
}
