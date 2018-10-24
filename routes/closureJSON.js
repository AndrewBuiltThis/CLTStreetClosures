var express = require('express');
var request = require('request');
var FormData = require('form-data');

var router = express.Router();

const queryUrl = 'https://gis.charlottenc.gov/arcgis/rest/services/CDOT/StreetClosuresAndDetours/MapServer/0/query';
const queryData = {
	where : "1=1",
	outfields : "GlobalID, BLOCKNM, ClosureType, STARTDATE, ENDDATE, LOCDESC",
	returnGeometry : "false",
	f : "json"
};

router.get('/', function(req,res,next) {
	request.post({url : queryUrl, formData : queryData}, function callBack(err, httpResponse, body) {
		if(err) {
			return console.error('Uh Oh, Something went wrong with the request! Specifially : ', err)
		}
		var outJSON = [];
		var bodyJSON = JSON.parse(httpResponse.body);
		var featureJSON = bodyJSON.features;
		//console.log(featureJSON);
		for (i=0; i < featureJSON.length; i++){
			outJSON.push(featureJSON[i].attributes);
		}
		//console.log(outJSON)
		sendJSON(outJSON);
	});
	function sendJSON(jsonResult){
		res.send(jsonResult);
	};
});

module.exports = router;