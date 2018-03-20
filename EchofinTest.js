/*
* Echofin API Documentation: https://www.echofin.co/docs/api/overview/
* 
*/

var Echofin = require("./lib/Echofin.js")(
  "63eb1087-88a9-4832-b4e7-0565d6d72d0b"
);

var userObject = {
	"email": "myemail@domain.com",
	"fullName": "Jon Doe",
	"userName": "myUserName",
	"password": "ABCD1234",
	"emailVerification": false
}

 
/* Create a new user to Echofin. Username & email must be unique accross Echofin. */
Echofin.Users.create(userObject, function(response){
	console.log(response);
});


/* Add the created user to the private room with ID e435586f */
Echofin.Chatrooms.addUser('e435586f', userObject.userName, function(response){
	console.log(response);
});

/* Remove the user from private room with ID e435586f */
Echofin.Chatrooms.removeUser('e435586f', userObject.userName, function(response){
	console.log(response);
});