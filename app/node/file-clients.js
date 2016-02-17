var fs = require("fs");
var fileName = "./clients.json";
var jsonClients = require(fileName);

var Clients = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    addItem: addItem,
    updateItem: updateItem,
    removeItem: removeItem
};

module.exports.Clients = Clients;

function getAll(req, res) {
    console.log(jsonClients.length);
    res.send(jsonClients);
}

function findById(req, res) {
    var id = req.params.id;
    var results = [];
    for (var i = 0; i < jsonClients.length; i++) {
        if (jsonClients[i].id == id) {
            results.push(jsonClients[i]);
        }
    }
    return res.send(results);
}

function findByName(req, res) {
    var name = req.params.name;
    var results = [];
    for (var i = 0; i < jsonClients.length; i++) {
        if (jsonClients[i].name.indexOf(name) > -1) {
            results.push(jsonClients[i]);
        }
    }
    return res.send(results);
}

function addItem(req, res) {
    var obj = {
        id: req.body.id,
        pic: req.body.pic,
        name: req.body.name,
        description: req.body.description
    };
    jsonClients.push(obj);
    fs.writeFile(fileName, JSON.stringify(jsonClients), "utf8", function () {
    });
    res.send('Ok');
}

function updateItem(req, res) {
    var id = req.body.id;
    var obj = {
        id: req.body.id,
        pic: req.body.pic,
        name: req.body.name,
        description: req.body.description
    };
    for (var i = 0; i < jsonClients.length; i++) {
        if (jsonClients[i].id == id) {
            jsonClients.splice(i, 1, obj);
            fs.writeFile(fileName, JSON.stringify(jsonClients), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}

function removeItem(req, res) {
    var id = req.body.id;
    for (var i = 0; i < jsonClients.length; i++) {
        if (jsonClients[i].id == id) {
            jsonClients.splice(i, 1);
            fs.writeFile(fileName, JSON.stringify(jsonClients), "utf8", function () {
            });
            break;
        }
    }
    res.send('Ok');
}