
if (typeof(DOTSGlobal) === 'undefined') DOTSGlobal = {};

DOTSGlobal.rootURL = "/DesignOfThisSite/";

DOTSGlobal.XMLGetRequest = function(url, onSuccess, params) {
	
	if (params && params.length > 0) url += "?" + DOTSGlobal.urlEncode(params);

	request = DOTSGlobal.__createXMLRequest("GET", url, onSuccess);

	request.send();

}

DOTSGlobal.XMLPostRequest = function(url, onSuccess, params) {
	
	request = DOTSGlobal.__createXMLRequest("POST", url, onSuccess);

	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	if (params && params.length > 0) request.send(DOTSGlobal.urlEncyouode(params));
	else request.send();

}

DOTSGlobal.urlEncode = function(params) {
	
	var encoded = "";
	var first = true;

	for (var key in params) {

		if (Array.isArray(params[key])) {

			var items = params[key];
			var encodedKey = encodeURIComponent(key) + "[]";
			
			for (var i = 0; i < items.length; i++) {
				
				if (first) first = false;
				else encoded += "&";

				encoded += encodedKey + "=" + encodeURIComponent(items[i]);
			}

		} else {

			if (first) first = false;
			else encoded += "&";

			encoded += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);

		}

	}

	return encoded;


}
DOTSGlobal.__createXMLRequest = function(type, url, onSuccess) {
	
	var request = new XMLHttpRequest();
	
	request.open(type, url, true);

	request.onload = function() {
	  	if (request.status >= 200 && request.status < 400) {
		    // Success!
		    onSuccess(request.responseText);
		} else {
		    // We reached our target server, but it returned an error
		    throw "XML HTTP request failed: "+request.status+" @ "+url;
		}
	};

	request.onerror = function() {
		// There was a connection error of some sort
		throw "XML HTTP request failed: Could not connect to "+url;
	};

	return request;
}
