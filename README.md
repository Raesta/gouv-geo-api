gouv-geo-api
======

[![NPM](https://nodei.co/npm/gouv-geo-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gouv-geo-api/)

[![npm version](https://badge.fury.io/js/gouv-geo-api.svg)](https://badge.fury.io/js/gouv-geo-api)

A Node wrapper for the [geo api](http://travaux.data.rennesmetropole.fr/).
---

### Installation
```javascript
$ npm install gouv-geo-api
```
or
```javascript
$ npm install git://github.com/Raesta/gouv-geo-api.git
```

### Example
```javascript
var GeoAPI = require('gouv-geo-api');

var Geo = new GeoAPI();

// get all towns with parameters
Geo.getTowns({codePostal: 94000}, function(error, result) {
  console.log(error, result);
});

// fetch all departments
Geo.getDepartments(null, function(error, result) {
  console.log(error, result);
});
```
