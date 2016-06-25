var request = require('request');
var apiUrl = 'https://geo.api.gouv.fr/';

function Geo() {
  this.apiUrl = apiUrl;
  this.request = req;
}

function req(method, apiUrl, data, callback) {
  var options = {};
  options.method = method;
  options.url = apiUrl;
  options.headers = { 'Content-Type': 'application/json' };
  request(options, function (error, response, body) {
    if (error) return callback(null, JSON.parse(error));
    switch (response.statusCode) {
      case 200:
        return callback(null, JSON.parse(body));
        break;
      case 400:
        return callback('BAD_REQUEST');
        break;
      case 404:
        return callback('NOT_FOUND');
        break;
    }
  });
}

Geo.prototype.getTowns = function(params, callback) {
  if (!params) return callback('MISSING_PARAMETERS');
  var url = apiUrl + 'communes/?';
  if (params.codePostal) url = (url.substr(url.length-1, 1) === '?' ? url + 'codePostal=' + params.codePostal : url + '&codePostal=' + params.codePostal);
  if (params.lat) url = (url.substr(url.length-1, 1) === '?' ? url + 'lat=' + params.lat : url + '&lat=' + params.lat);
  if (params.lon) url = (url.substr(url.length-1, 1) === '?' ? url + 'lon=' + params.lon : url + '&lon=' + params.lon);
  if (params.nom) url = (url.substr(url.length-1, 1) === '?' ? url + 'nom=' + params.nom : url + '&nom=' + params.nom);
  if (params.boost) url = (url.substr(url.length-1, 1) === '?' ? url + 'boost=' + params.boost : url + '&boost=' + params.boost);
  if (params.code) url = (url.substr(url.length-1, 1) === '?' ? url + 'code=' + params.code : url + '&code=' + params.code);
  if (params.codeDepartement) url = (url.substr(url.length-1, 1) === '?' ? url + 'codeDepartement=' + params.codeDepartement : url + '&codeDepartement=' + params.codeDepartement);
  if (params.codeRegion) url = (url.substr(url.length-1, 1) === '?' ? url + 'codeRegion=' + params.codeRegion : url + '&codeRegion=' + params.codeRegion);
  if (params.fields) url = (url.substr(url.length-1, 1) === '?' ? url + 'fields=' + params.fields : url + '&fields=' + params.fields);
  if (params.format) url = (url.substr(url.length-1, 1) === '?' ? url + 'format=' + params.format : url + '&format=' + params.format);
  if (params.geometry) url = (url.substr(url.length-1, 1) === '?' ? url + 'geometry=' + params.geometry : url + '&geometry=' + params.geometry);
  req('GET', url, null, function(error, result) {
    if (error) return callback(error);
    else return callback(null, result);
  });
}

Geo.prototype.getTown = function(params, callback) {
  if (!params) return callback('MISSING_PARAMETERS');
  if (!params.code) return callback('MISSING_CODE');
  var url = apiUrl + 'communes/' + params.code + '?';
  if (params.code) url = (url.substr(url.length-1, 1) === '?' ? url + 'code=' + params.code : url + '&code=' + params.code);
  if (params.fields) url = (url.substr(url.length-1, 1) === '?' ? url + 'fields=' + params.fields : url + '&fields=' + params.fields);
  if (params.format) url = (url.substr(url.length-1, 1) === '?' ? url + 'format=' + params.format : url + '&format=' + params.format);
  if (params.geometry) url = (url.substr(url.length-1, 1) === '?' ? url + 'geometry=' + params.geometry : url + '&geometry=' + params.geometry);
  req('GET', url, null, function(error, result) {
    if (error) return callback(error);
    else return callback(null, result);
  });
}

Geo.prototype.getDepartments = function(params, callback) {
  var url = apiUrl + 'departements/?';
  if (params.code) url = (url.substr(url.length-1, 1) === '?' ? url + 'code=' + params.code : url + '&code=' + params.code);
  if (params.codeRegion) url = (url.substr(url.length-1, 1) === '?' ? url + 'codeRegion=' + params.codeRegion : url + '&codeRegion=' + params.codeRegion);
  if (params.nom) url = (url.substr(url.length-1, 1) === '?' ? url + 'nom=' + params.nom : url + '&nom=' + params.nom);
  if (params.fields) url = (url.substr(url.length-1, 1) === '?' ? url + 'fields=' + params.fields : url + '&fields=' + params.fields);
  req('GET', url, null, function(error, result) {
    if (error) return callback(error);
    else return callback(null, result);
  });
}

Geo.prototype.getDepartment = function(params, callback) {
  if (!params) return callback('MISSING_PARAMETERS');
  if (!params.code) return callback('MISSING_CODE');
  var url = apiUrl + 'departements/' + params.code + '?';
  if (params.fields) url = (url.substr(url.length-1, 1) === '?' ? url + 'fields=' + params.fields : url + '&fields=' + params.fields);
  req('GET', url, null, function(error, result) {
    if (error) return callback(error);
    else return callback(null, result);
  });
}

Geo.prototype.getTownsOfDepartment = function(params, callback) {
  if (!params) return callback('MISSING_PARAMETERS');
  if (!params.code) return callback('MISSING_CODE');
  var url = apiUrl + 'departements/' + params.code + '/communes/?';
  if (params.fields) url = (url.substr(url.length-1, 1) === '?' ? url + 'fields=' + params.fields : url + '&fields=' + params.fields);
  req('GET', url, null, function(error, result) {
    if (error) return callback(error);
    else return callback(null, result);
  });
}
module.exports = Geo;
