'use strict';

module.exports = function (app) {

	const User = app.models.People;

	User.greet = function(msg, cb) {
		cb(null, 'Greetings... ' + msg);
	}

	User.remoteMethod(
		'greet', 
		{
      		isStatic: true,
			accepts: {arg: 'msg', type: 'string'},
			returns: {arg: 'greeting', type: 'string'},
      		http: { verb: 'get', path: '/greet' }
		}
	);

	User.login = function(req, cb) {

		var email 		= req.email,
			password 	= req.password;

		User.findOne({
 	 		"where": {	
				"email": email,
				"password": password
			}
		}, function( err, res ){

			if( err || !res ) {

				var theError = err;

				if(!res)
				{
				    theError = new Error('Incorrect credentials!');
				    theError.status = 501;
				}

				console.error('something went wrong...!', theError);
				
				cb(theError);

				return false;
			}

			cb(null, res);
		});
	}

	User.remoteMethod(
		'login', 
		{
    		description: "Logs in using People data",
			accepts: {arg: 'credentials', type: 'object', "http": {"source": "body"}},
			returns: {arg: 'user', type: 'object'},
      		http: { verb: 'POST', path: '/login' }
		}
	);

	// User.addPhotographer = function(msg, cb) {

	// 	cb(null, 'Angular and Loopback is now Configured For ' + msg);
	// 	// process.nextTick(function() {
	// 	// 	msg = msg || 'hello';
	// 	// 	cb(null, 'Angular and Loopback is now Configured For ' + msg);
	// 	// });
	// };

	// User.remoteMethod(
	// 	'addPhotographer', {
	// 		accepts: {
	// 			arg: 'msg',
	// 			type: 'string'
	// 		},
	// 		returns: {
	// 			arg: 'greeting',
	// 			type: 'string'
	// 		},
 //            http: {
 //            	path: '/getname',
 //                verb: 'post'
 //            }
	// 	}
	// );
};
