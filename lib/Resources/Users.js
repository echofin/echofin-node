'use strict';

var EchofinResource = require('../EchofinResource.js');
var utils = require('../utils.js');

module.exports = EchofinResource.extend({
	_usersEndpoint: "user",
	/**
     * @param array|null $params
     *
     * @return Create a new user.
	*/
	create: function(params, callback){		
		this.exec(this._usersEndpoint + "/register", params, function(res){			
			callback(res);
		});
	}
});