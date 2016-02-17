var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var GroupsModel = require('./mongo').GroupsModel;

var Groups = {
    getGroups: getGroups,
    findGroup: findGroup,
    findPostGroup: findPostGroup,
    editGroup: editGroup,
	editPostGroup: editPostGroup,
    updateGroup: updateGroup,
    addGroup: addGroup,
    saveGroup: saveGroup,
    removeAllGroups: removeAllGroups,
    removeGroup: removeGroup
};

module.exports.Groups = Groups;

function getGroups(req, res) {
    return GroupsModel.find(function (err, items) {
        if (!err) {
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findGroup(req, res) {
    GroupsModel.findOne({
        id: req.params.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(item);
        res.send(item);
    });
}

function findPostGroup(req, res) {
    GroupsModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(item);
        res.send(item);
    });
}

function editGroup(req, res) {
    GroupsModel.findOne({
        id: req.params.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }

        item.name = req.params.name;

        item.save(function (err) {
            if (!err) {
                res.send(item);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostGroup(req, res) {
    GroupsModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, item) {
            if (!err) {
                res.send(item);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateGroup(req, res) {
    GroupsModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }

        item.name = req.body.name;
        item.category = req.body.category;
        item.description = req.body.description;

        item.save(function (err) {
            if (!err) {
                res.send(item);
            } else {
                return res.send(err);
            }
        });
    });
}

function addGroup(req, res) {
    GroupsModel.create({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description
        },
        function (err, item) {
            if (err) {
                return res.send({error: 'Server error'});
            }
            res.send(item);
        });
}

function saveGroup(req, res) {
    console.log(req.body);
    var item = new GroupsModel({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description
    });
    item.save(function (err) {
        if (!err) {
            res.send(item);
        } else {
            return res.send(err);
        }
    });
}

function removeAllGroups(req, res, err) {
    GroupsModel.remove({}, function (err) {
    });
    res.send('Collection Groups removed');
}

function removeGroup(req, res) {
    GroupsModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Group with id: ', req.body.id, ' was removed');
    });
    res.send('Group with id: ' + req.body.id + ' was removed');
}