var fs = require("fs");
var fileName = "./groups.json";
var jsonGroups = require(fileName);

var Groups = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    addItem: addItem,
    updateItem: updateItem,
    removeItem: removeItem
};

module.exports.Groups = Groups;

function getAll(req, res) {
    console.log(jsonGroups.length);
    res.send(jsonGroups);
}

function findById(req, res) {
    var id = req.params.id;
    var results = [];
    for (var i = 0; i < jsonGroups.length; i++) {
        if (jsonGroups[i].id == id) {
            results.push(jsonGroups[i]);
        }
    }
    return res.send(results);
}

function findByName(req, res) {
    var name = req.params.name;
    var results = [];
    for (var i = 0; i < jsonGroups.length; i++) {
        if (jsonGroups[i].name.indexOf(name) > -1) {
            results.push(jsonGroups[i]);
        }
    }
    return res.send(results);
}

function addItem(req, res) {
    var obj = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    };
    jsonGroups.push(obj);
    fs.writeFile(fileName, JSON.stringify(jsonGroups), "utf8", function () {
    });
    res.send('Ok');
}

function updateItem(req, res) {
    var id = req.body.id;
    var obj = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    };
    for (var i = 0; i < jsonGroups.length; i++) {
        if (jsonGroups[i].id == id) {
            jsonGroups.splice(i, 1, obj);
            fs.writeFile(fileName, JSON.stringify(jsonGroups), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}

function removeItem(req, res) {
    var id = req.body.id;
    for (var i = 0; i < jsonGroups.length; i++) {
        if (jsonGroups[i].id == id) {
            jsonGroups.splice(i, 1);
            fs.writeFile(fileName, JSON.stringify(jsonGroups), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}