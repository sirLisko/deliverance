'use strict';

var deliverance = require('deliverance-scraper');
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var menuCached;

if (fs.existsSync('./config.json')) {
	var config = require('./config.json');
	if (config.exclude) {
		deliverance.exclude(config.exclude);
	}
}

app.get('/v1/menu', function(req, res){
	if(menuCached) {
		res.send(menuCached);
	} else {
		deliverance.getMenu().then(function(menu){
			res.send(menu);
			menuCached = menu;
		}).done();
	}
});

app.get('/v1/menu/:specificMenu', function(req, res){
	var specificMenu = req.params.specificMenu;
	deliverance.getMenu(specificMenu).then(function(menu){
		res.send(menu);
	}).done();
});

app.get('/v1/menuList', function(req, res){
	deliverance.getMenuList().then(function(list){
		res.send(list);
	}).done();
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port + '...');
