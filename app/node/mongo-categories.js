var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var CategoriesModel = require('./mongo').CategoriesModel;

var Categories = {
    getCategories: getCategories,
    findCategory: findCategory,
    findPostCategory: findPostCategory,
    editCategory: editCategory,
	editPostCategory: editPostCategory,
    updateCategory: updateCategory,
    addCategory: addCategory,
    saveCategory: saveCategory,
    removeAllCategories: removeAllCategories,
    removeCategory: removeCategory
};

module.exports.Categories = Categories;

function getCategories(req, res) {
    return CategoriesModel.find(function (err, items) {
        if (!err) {
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findCategory(req, res) {
    CategoriesModel.findOne({
        id: req.params.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(item);
        res.send(item);
    });
}

function findPostCategory(req, res) {
    CategoriesModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(item);
        res.send(item);
    });
}

function editCategory(req, res) {
    CategoriesModel.findOne({
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

function editPostCategory(req, res) {
    CategoriesModel.findOneAndUpdate({
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

function updateCategory(req, res) {
    CategoriesModel.findOne({
        id: req.body.id
    }, function (err, item) {
        if (err) {
            res.send({error: err.message});
        }

        item.name = req.body.name;
        item.groups = req.body.groups;
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

function addCategory(req, res) {
    CategoriesModel.create({
            id: req.body.id,
            name: req.body.name,
            groups: req.body.groups,
            description: req.body.description
        },
        function (err, item) {
            if (err) {
                return res.send({error: 'Server error'});
            }
            res.send(item);
        });
}

function saveCategory(req, res) {
    console.log(req.body);
    var item = new CategoriesModel({
            id: req.body.id,
            name: req.body.name,
            groups: req.body.groups,
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

function removeAllCategories(req, res, err) {
    CategoriesModel.remove({}, function (err) {
    });
    res.send('Collection Categories removed');
}

function removeCategory(req, res) {
    CategoriesModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Category with id: ', req.body.id, ' was removed');
    });
    res.send('Category with id: ' + req.body.id + ' was removed');
}