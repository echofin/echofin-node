'use strict';

var resources = {
	Users: require("./Resources/Users.js"),
	Chatrooms: require("./Resources/Chatrooms.js")
}

Echofin.API_BASE = 'https://api.echofin.co';
Echofin.API_VERSION = 'v1';
Echofin.EchofinResource = require('./EchofinResource.js');
Echofin.Resources = resources;


function Echofin(APIKEY){
	if(!(this instanceof Echofin)) {
		return new Echofin(APIKEY);
	}

	this._api = {
		apiToken: null,
		outputDebug: false,
		apiBase: Echofin.API_BASE,
		apiVersion: Echofin.API_VERSION,
		outputMsg: null
	};
	
	this._prepResources();
	this.setToken(APIKEY);

}



Echofin.prototype = {
	 /**
     * Sets the API token to be used for requests.
     *
     * @param string $apiKey
     */
	setToken: function(token){
		if(token){
			this._api['apiToken'] = token;
		}
	},
	/**
     * Sets the debug output status to be used for requests.
     *
     * @param bool $status
     */
	setDebug: function(status){
		this._api['outputDebug'] = new Boolean(status);
	},
	/**
     * Add external resources to module
     *
     */
	_prepResources: function() {
	    for (var name in resources) {
	    	this[name] = new resources[name](this);
	    }
	}
}

module.exports = Echofin;
module.exports.Echofin = Echofin;