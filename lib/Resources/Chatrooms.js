'use strict';

var EchofinResource = require('../EchofinResource.js');
var utils = require('../utils.js');

module.exports = EchofinResource.extend({
	_chatroomsEndpoint: "chatroom",
	/**
     * @param string $room
     * @param string $user
     *
     * @return add a user to private chatroom.
     */
	addUser: function(room, user, callback){		
		this.exec(this._chatroomsEndpoint + "/add-user", {"room": room, "user": user}, function(res){			
			callback(res);
		});
	},
	/**
     * @param string $room
     * @param string $user
     *
     * @return removes a user from private chatroom.
     */
	removeUser: function(room, user, callback){		
		this.exec(this._chatroomsEndpoint + "/remove-user", {"room": room, "user": user}, function(res){			
			callback(res);
		});
	}
});