var url = 'https://geo.api.gouv.fr/';

function Geo() {
  this.apiUrl = url;
  this.request = req;
}

function req(method, apiUrl, path, callback) {
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
    }
  });
}

module.exports = Geo;
