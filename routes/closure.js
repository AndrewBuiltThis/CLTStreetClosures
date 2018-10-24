var express = require('express');
var request = require('request');
var FormData = require('form-data');

var router = express.Router();

// GET API Metadata result for an individual entry
router.get('/:closureId', function(req, res) {
	var closureId = req.params.closureId ;
	const queryUrl = 'https://gis.charlottenc.gov/arcgis/rest/services/CDOT/StreetClosuresAndDetours/MapServer/0/query';
	var queryData = {
		where : `GlobalId = '${closureId}'`,
		outfields : "GlobalID, BLOCKNM, ClosureType, DateCommunicated, STARTDATE, ENDDATE, LOCDESC, StartHour, StartAMPM, EndHour, EndAMPM, ALTROUTE, COMMENT, DIRECTION, CATS, CONTACT, ContactCommunications",
		returnGeometry : "false",
		f : "json"
	};
	var extentQueryData = {
		where : `GlobalId = '${closureId}'`,
		returnGeometry : "false",
		returnExtentOnly : "true",
		f : "json"
	}
	//console.log(queryData);
	
	request.post({url : queryUrl, formData : queryData}, function callBack(err, httpResponse, body) {
		if(err) {
			return console.error('Uh Oh, Something went wrong with the request! Specifially : ', err)
		}
		//console.log(httpResponse);
		var bodyJSON = JSON.parse(httpResponse.body);
		var featureJSON = bodyJSON.features[0].attributes;
		//console.log(featureJSON);
		getMapExtent(featureJSON);
		
	});
	
	function getMapExtent(featureJSON) {
		request.post({url: queryUrl, formData : extentQueryData}, function callBack(err, httpResponse, body){
			if(err) {
				return console.error('Ahhhh shit...' , err)
			}
			var extentBody = JSON.parse(httpResponse.body);
			//var xMin = extentBody.extent.xmin;
			//var yMin = extentBody.extent.ymin;
			//var xMax = extentBody.extent.xmax;
			//var yMax = extentBody.extent.ymax;
			getMapExport(extentBody, featureJSON);
		});	
	};
	
	function getMapExport(extentBody, featureJSON) {

		//var rawWebMap = {mapOptions:{showAttribution:false,extent:{xmin: `${xMin}` ,ymin:  `${yMin}`  ,xmax:  `${xMax}` ,ymax: `${yMax}`  ,spatialReference:{wkid:102719,latestWkid:2264}},spatialReference:{wkid:102719,latestWkid:2264},scale:10000.819286},operationalLayers:[{id:'defaultBasemap',title:'defaultBasemap',opacity:1,minScale:0,maxScale:0,url:'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer'},{id:'StreetClosuresAndDetours_8657',title:'StreetClosuresAndDetours_8657',opacity:1,minScale:0,maxScale:0,url:'https://gis.charlottenc.gov/arcgis/rest/services/CDOT/StreetClosuresAndDetours/MapServer',layers:[{id:0,layerDefinition:{source:{type:'mapLayer',mapLayerId:0}}},{id:1,layerDefinition:{source:{type:'mapLayer',mapLayerId:1}}}]}],exportOptions:{outputSize:[946,575],dpi:96}};
		/*var strWM = JSON.stringify(rawWebMap);
		var exportUrl = 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute';
		var exportData = {
			WebMap_as_JSON: strWM,
			Format : "PDF",
			Layout_Template : "MAP_ONLY",
			f : "json"
		};
		console.log(rawWebMap);
		console.log(exportData);
		*/
		/*
		WebMap_as_JSON: '{"mapOptions":{"showAttribution":false,"extent":{"xmin": 1504000 ,"ymin":  537500  ,"xmax":  1504350 , "ymax": 537600  ,"spatialReference":{"wkid":102719,"latestWkid":2264}},"spatialReference":{"wkid":102719,"latestWkid":2264},"scale":10000.819286},"operationalLayers":[{"id":"defaultBasemap","title":"defaultBasemap","opacity":1,"minScale":0,"maxScale":0,"url":"https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer"},{"id":"StreetClosuresAndDetours_8657","title":"StreetClosuresAndDetours_8657","opacity":1,"minScale":0,"maxScale":0,"url":"https://gis.charlottenc.gov/arcgis/rest/services/CDOT/StreetClosuresAndDetours/MapServer","layers":[{"id":0,"layerDefinition":{"source":{"type":"mapLayer","mapLayerId":0}}},{"id":1,"layerDefinition":{"source":{"type":"mapLayer","mapLayerId":1}}}]}],"exportOptions":{"outputSize":[946,575],"dpi":96}}',
		*/
		/*request.post({url : exportUrl, json : exportData}, function callBack(err, httpResponse, body) {
			console.log(request.post);
			console.log("Executing Map Function");
			if(err) {
				return console.error('Uh Oh, Something went wrong with the request! Specifially : ', err)
			}
			console.log(body);
		});*/
		
		var getWebMap = `https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute?Web_Map_as_JSON=%7B%22mapOptions%22%3A%7B%22showAttribution%22%3Afalse%2C%22extent%22%3A%7B%22xmin%22%3A+${extentBody.extent.xmin}+%2C%22ymin%22%3A++${extentBody.extent.ymin}++%2C%22xmax%22%3A++${extentBody.extent.xmax}+%2C+%22ymax%22%3A+${extentBody.extent.ymax}++%2C%22spatialReference%22%3A%7B%22wkid%22%3A102719%2C%22latestWkid%22%3A2264%7D%7D%2C%22spatialReference%22%3A%7B%22wkid%22%3A102719%2C%22latestWkid%22%3A2264%7D%2C%22scale%22%3A5000.819286%7D%2C%22operationalLayers%22%3A%5B%7B%22id%22%3A%22defaultBasemap%22%2C%22title%22%3A%22defaultBasemap%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fservices.arcgisonline.com%2Farcgis%2Frest%2Fservices%2FCanvas%2FWorld_Light_Gray_Base%2FMapServer%22%7D%2C%7B%22id%22%3A%22StreetClosuresAndDetours_8657%22%2C%22title%22%3A%22StreetClosuresAndDetours_8657%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fgis.charlottenc.gov%2Farcgis%2Frest%2Fservices%2FCDOT%2FStreetClosuresAndDetours%2FMapServer%22%2C%22layers%22%3A%5B%7B%22id%22%3A0%2C%22layerDefinition%22%3A%7B%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A0%7D%7D%7D%2C%7B%22id%22%3A1%2C%22layerDefinition%22%3A%7B%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A1%7D%7D%7D%5D%7D%5D%2C%22exportOptions%22%3A%7B%22outputSize%22%3A%5B946%2C575%5D%2C%22dpi%22%3A96%7D%7D&Format=PNG32&Layout_Template=MAP_ONLY&env%3AoutSR=&env%3AprocessSR=&returnZ=false&returnM=false&returnTrueCurves=false&returnFeatureCollection=false&f=pjson`;
	
		request.get(getWebMap, {timeout:60000}, function(err, httpResponse, body){
			if(err){
				console.error(err);
				console.log(err);
			}
			var exportedJSON = JSON.parse(body);
			// var outputPDF = body.results;
			var webMapURL = exportedJSON.results[0].value.url;
			sendJSON(webMapURL, featureJSON);
		});
	};
	
	function sendJSON(webMapURL, featureJSON){
		var additionalInfo = featureJSON.COMMENT;
		if (featureJSON.DIRECTION == 'BOTH_DIRECTIONS'){
			var closureDirection = 'in both directions'
		} else if(featureJSON.DIRECTION == 'SOUTH'){
			var closureDirection = 'southbound';
		} else if(featureJSON.DIRECTION == 'NORTH'){
			var closureDirection = 'northbound';
		} else if(featureJSON.DIRECTION == 'EAST') {
			var closureDirection = 'eastbound';
		} else if(featureJSON.DIRECTION == 'WEST') {
			var closureDirection = 'westward';
		} else {
			var closureDirection = 'in one or both directions'
		};
		
		res.render('closures', {closureId : closureId, closureName : featureJSON.BLOCKNM, closureType : featureJSON.ClosureType, communicationDate : featureJSON.DateCommunicated, startDate: featureJSON.STARTDATE, endDate: featureJSON.ENDDATE, closureDescription: featureJSON.LOCDESC, closureStartTime : featureJSON.StartHour, closureStartAMPM : featureJSON.StartAMPM, closureEndTime : featureJSON.EndHour, closureEndAMPM : featureJSON.EndAMPM, altRoute : featureJSON.ALTROUTE, additionalInfo : featureJSON.COMMENT, closureDirection : closureDirection, cats : featureJSON.CATS, contact: featureJSON.CONTACT, cdotContact :featureJSON.ContactCommunications, webMapUrl : webMapURL });
		//console.log(webMapURL);
	};

	
});

module.exports = router;

