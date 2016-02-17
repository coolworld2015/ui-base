var fs = require("fs");
var fileName = "./categories.json";
var jsonCategories = require(fileName);

var Categories = {
	getAll: getAll,
	findById: findById,
	findByName: findByName,
	addItem: addItem,
	updateItem: updateItem,
	removeItem: removeItem
};

module.exports.Categories = Categories;

function getAll(req, res) {
	console.log(jsonCategories.length);
	res.send(jsonCategories);
}

function findById(req, res) {
	var id = req.params.id;
	var results = [];
	for (var i = 0; i < jsonCategories.length; i++) {
		if (jsonCategories[i].id == id) {
			results.push(jsonCategories[i]);
		}
	}
	return res.send(results);
}

function findByName(req, res) {
	var name = req.params.name;
	var results = [];
	for (var i = 0; i < jsonCategories.length; i++) {
		if (jsonCategories[i].name.indexOf(name) > -1) {
			results.push(jsonCategories[i]);
		}
	}
	return res.send(results);
}

function addItem(req, res) {
	var obj = {
		id: req.body.id,
		name: req.body.name,
		groups: req.body.groups,
		description: req.body.description
	};
	jsonCategories.push(obj);
	fs.writeFile(fileName, JSON.stringify(jsonCategories), "utf8", function () {
	});
	res.send('Ok');
}

function updateItem(req, res) {
	var id = req.body.id;
	var obj = {
		id: req.body.id,
		name: req.body.name,
		groups: req.body.groups,
		description: req.body.description
	};
	for (var i = 0; i < jsonCategories.length; i++) {
		if (jsonCategories[i].id == id) {
			jsonCategories.splice(i, 1, obj);
			fs.writeFile(fileName, JSON.stringify(jsonCategories), "utf8", function () {
			});
			break;
		}
	}
	res.send('Ok');
}

function removeItem(req, res) {
	var id = req.body.id;
	for (var i = 0; i < jsonCategories.length; i++) {
		if (jsonCategories[i].id == id) {
			jsonCategories.splice(i, 1);
			fs.writeFile(fileName, JSON.stringify(jsonCategories), "utf8", function () {
			});
			break;
		}
	}
	res.send('Ok');
}