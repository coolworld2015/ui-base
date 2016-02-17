var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/build/index.html');
    //res.send('It is just API Server...');
});

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileClients = require('./file-clients').Clients;

app.get('/file/api/clients/get', fileClients.getAll); 
app.get('/file/api/clients/findId/:id', fileClients.findById);
app.get('/file/api/clients/findByName/:name', fileClients.findByName);
app.post('/file/api/clients/add', fileClients.addItem);
app.post('/file/api/clients/delete', fileClients.removeItem);
app.post('/file/api/clients/update', fileClients.updateItem);

//------------------------------------------------------------------------
var mongoClients = require('./mongo-clients').Clients;

app.get('/api/clients/get', mongoClients.getClients);
app.get('/api/clients/find/:id', mongoClients.findClient);
app.post('/api/clients/find', mongoClients.findPostClient);
app.get('/api/clients/edit/:id/:name', mongoClients.editClient);
app.post('/api/clients/edit/', mongoClients.editPostClient);
app.post('/api/clients/update', mongoClients.updateClient);
app.post('/api/clients/add', mongoClients.addClient);
app.post('/api/clients/save', mongoClients.saveClient);
app.get('/api/clients/drop', mongoClients.removeAllClients);
app.post('/api/clients/drop', mongoClients.removeAllClients);
app.post('/api/clients/delete', mongoClients.removeClient);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileCategories = require('./file-categories').Categories;

app.get('/file/api/categories/get', fileCategories.getAll);
app.get('/file/api/categories/findId/:id', fileCategories.findById);
app.get('/file/api/categories/findByName/:name', fileCategories.findByName);
app.post('/file/api/categories/add', fileCategories.addItem);
app.post('/file/api/categories/delete', fileCategories.removeItem);
app.post('/file/api/categories/update', fileCategories.updateItem);

//------------------------------------------------------------------------
var mongoCategories = require('./mongo-categories').Categories;

app.get('/api/categories/get', mongoCategories.getCategories);
app.get('/api/categories/find/:id', mongoCategories.findCategory);
app.post('/api/categories/find', mongoCategories.findPostCategory);
app.get('/api/categories/edit/:id/:name', mongoCategories.editCategory);
app.post('/api/categories/edit/', mongoCategories.editPostCategory);
app.post('/api/categories/update', mongoCategories.updateCategory);
app.post('/api/categories/add', mongoCategories.addCategory);
app.post('/api/categories/save', mongoCategories.saveCategory);
app.get('/api/categories/drop', mongoCategories.removeAllCategories);
app.post('/api/categories/drop', mongoCategories.removeAllCategories);
app.post('/api/categories/delete', mongoCategories.removeCategory);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileGroups = require('./file-groups').Groups;

app.get('/file/api/groups/get', fileGroups.getAll);
app.get('/file/api/groups/findId/:id', fileGroups.findById);
app.get('/file/api/groups/findByName/:name', fileGroups.findByName);
app.post('/file/api/groups/add', fileGroups.addItem);
app.post('/file/api/groups/delete', fileGroups.removeItem);
app.post('/file/api/groups/update', fileGroups.updateItem);

//------------------------------------------------------------------------
var mongoGroups = require('./mongo-groups').Groups;

app.get('/api/groups/get', mongoGroups.getGroups);
app.get('/api/groups/find/:id', mongoGroups.findGroup);
app.post('/api/groups/find', mongoGroups.findPostGroup);
app.get('/api/groups/edit/:id/:name', mongoGroups.editGroup);
app.post('/api/groups/edit/', mongoGroups.editPostGroup);
app.post('/api/groups/update', mongoGroups.updateGroup);
app.post('/api/groups/add', mongoGroups.addGroup);
app.post('/api/groups/save', mongoGroups.saveGroup);
app.get('/api/groups/drop', mongoGroups.removeAllGroups);
app.post('/api/groups/drop', mongoGroups.removeAllGroups);
app.post('/api/groups/delete', mongoGroups.removeGroup);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileItems = require('./file-items').Items;

app.get('/file/api/items/getAll', fileItems.getAll);
app.get('/file/api/items/get', fileItems.getFirstHundred);
app.get('/file/api/items/findId/:id', fileItems.findById);
app.get('/file/api/items/findByName/:name', fileItems.findByName);
app.post('/file/api/items/add', fileItems.addItem);
app.post('/file/api/items/delete', fileItems.removeItem);
app.post('/file/api/items/update', fileItems.updateItem);

//------------------------------------------------------------------------
var mongoItems = require('./mongo-items').Items;

app.get('/api/items/getAll', mongoItems.getItems);
app.get('/api/items/get', mongoItems.getFirstHundred);
app.get('/api/items/find/:id', mongoItems.findItem);
app.post('/api/items/find', mongoItems.findPostItem);
app.get('/api/items/findByName/:name', mongoItems.findByName);
app.get('/api/items/edit/:id/:name', mongoItems.editItem);
app.post('/api/items/edit/', mongoItems.editPostItem);
app.post('/api/items/update', mongoItems.updateItem);
app.post('/api/items/add', mongoItems.addItem);
app.post('/api/items/save', mongoItems.saveItem);
app.get('/api/items/drop', mongoItems.removeAllItems);
app.post('/api/items/drop', mongoItems.removeAllItems);
app.post('/api/items/delete', mongoItems.removeItem);

//------------------------------------------------------------------------
//------------------------------------------------------------------------
var fileUsers = require('./file-users').Users;

app.get('/file/api/users/get', fileUsers.getAll);
app.get('/file/api/users/findId/:id', fileUsers.findById);
app.get('/file/api/users/findByName/:name', fileUsers.findByName);
app.post('/file/api/users/add', fileUsers.addItem);
app.post('/file/api/users/delete', fileUsers.removeItem);
app.post('/file/api/users/update', fileUsers.updateItem);

//------------------------------------------------------------------------
var mongoUsers = require('./mongo-users').Users;

app.get('/api/users/get', mongoUsers.getUsers);
app.get('/api/users/findByName/:name', mongoUsers.findByName);
app.post('/api/users/find', mongoUsers.findPostUser);
app.post('/api/users/update', mongoUsers.updateUser);
app.post('/api/users/add', mongoUsers.addUser);
app.get('/api/users/drop', mongoUsers.removeAllUsers);
app.post('/api/users/delete', mongoUsers.removeUser);