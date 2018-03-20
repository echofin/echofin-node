'use strict';
var request = require('request');
var utils = require('./utils.js');
var hasOwn = {}.hasOwnProperty;

EchofinResource.extend = utils.protoExtend;


function EchofinResource(Echofin) {
  this._Echofin = Echofin;
  this.initialize.apply(this, arguments);
}

EchofinResource.prototype = {
  path: '',
  initialize: function() {},
  /**
     * Get the API base url.
     *
     * @param void 
     */
  _getAPIUrl: function(){
    return this._Echofin._api['apiBase'] + "/" + this._Echofin._api['apiVersion'] + "/";
  },
  /**
     * Execute an http request by the endpoint url
     *
     * @param string $endpoint 
     * @param array $params
     */
  exec: function(endpoint, params, callback){
    if(endpoint===undefined || endpoint==null){
      this.handleOutput({"error": "endpoint is invalid"});
      return;
    }

    params.token  = this._Echofin._api['apiToken'];

    var options = {
      method: 'post',
      body: params,
      json: true,
      url:  this._getAPIUrl() + endpoint,
      header: {
        'Content-Type': 'Content-Type:application/json'
      }
    }


    request(options, function (err, res, body) {
      if(body.Message){
        callback({"message": body.Message, "statusCode": res.statusCode});
      }
      else{
        callback({"message": err, "statusCode": res.statusCode});
      }
    });

  

  },
};

module.exports = EchofinResource;