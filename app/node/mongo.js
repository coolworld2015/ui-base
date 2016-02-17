var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds049935.mongolab.com:49935/ui-collection');
//mongoose.connect('mongodb://localhost:27017/ui-collection');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Error from mongoDB: ' + err.message);
});

db.once('open', function callback() {
    console.log('Connected to mongoDB');
});

var Schema = mongoose.Schema;

//---------------------------------------------------------------------------------------------
var Clients = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    pic: {type: String, required: true},
    description: {type: String, required: true}
});

var ClientsModel = mongoose.model('Clients', Clients);
module.exports.ClientsModel = ClientsModel;

//---------------------------------------------------------------------------------------------
var Categories = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    groups: [],
    description: {type: String, required: true}
});

var CategoriesModel = mongoose.model('Categories', Categories);
module.exports.CategoriesModel = CategoriesModel;

//---------------------------------------------------------------------------------------------
var Groups = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true}
});

var GroupsModel = mongoose.model('Groups', Groups);
module.exports.GroupsModel = GroupsModel;

//---------------------------------------------------------------------------------------------
var Items = new Schema({
    id: {type: String, required: true},
    pic: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    group: {type: String, required: true},
    description: {type: String, required: true}
});

var ItemsModel = mongoose.model('Items', Items);
module.exports.ItemsModel = ItemsModel;

//---------------------------------------------------------------------------------------------
var Users = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    pass: {type: String, required: true},
    description: {type: String, required: true}
});

var UsersModel = mongoose.model('Users', Users);
module.exports.UsersModel = UsersModel;