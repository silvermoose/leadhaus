var db = require('./pghelper'),
    //config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('Select firstname, lastname, title, company, phone, email, leadsource from salesforce.lead ORDER BY CREATEDDATE DESC LIMIT $1', [limit]);
};



function findById(id) {
    return db.query('Select firstname, lastname, title, company, phone, email, leadsource from salesforce.lead WHERE id=$1', [id], true);
};

function getAll(req, res, next) {
    findAll(15)
        .then(function (leads) {

            //return res.send(JSON.stringify(leads));
            //var lead = JSON.stringify(leads);
            //console.log ('data from stringify ' + data)
            //res.render('pages/leads.jade', { lead: JSON.stringify(leads), title: 'My Leads' });
            res.render('pages/leads.jade', { lead: leads, title: 'My Leads' });
        })
        .catch(next);
};

function getById(req, res, next) {
    var id = req.params.id;
    findById(id)
        .then(function (lead) {
            return res.send(JSON.stringify(lead));
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.getAll = getAll;
exports.getById = getById;
