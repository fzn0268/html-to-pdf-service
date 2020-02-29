'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.v1ConversionFromHtmlToPdfPOST = function v1ConversionFromHtmlToPdfPOST (req, res, next, body) {
  Default.v1ConversionFromHtmlToPdfPOST(body)
    .then(function (response) {
      // utils.writeJson(res, response);
      res.writeHead(200, {'Content-Type': 'application/pdf', 'Pragma': 'private', 'Cache-Control': ['private', 'must-revalidate']});
      res.end(response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};
