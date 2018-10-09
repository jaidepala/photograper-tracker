'use strict';

module.exports = function (app) {

	const People 	= app.models.People,
		  User 		= app.models.User;

	People.greet = function(msg, cb) {
		cb(null, 'Greetings... ' + msg);
	};

	People.remoteMethod(
		'greet', 
		{
      		isStatic: true,
			accepts: {arg: 'msg', type: 'string'},
			returns: {arg: 'greeting', type: 'string'},
      		http: { verb: 'get', path: '/greet' }
		}
	);

	People.login = function(req, cb) {

		var email 		= req.email,
			password 	= req.password;

		People.findOne({
 	 		"where": {	
				"email": email,
				"password": password
			}
		}, function( err, peopleFindRes ){

			if( err || !peopleFindRes ) {

				var theError = err;

				if(!peopleFindRes)
				{
				    theError = new Error('Incorrect credentials!');
				    theError.status = 501;
				}

				cb(theError);

				return false;
			};

			User.login({
				"email": email,
				"password": password
			}, function( loginErr, loginRes ) {

				if( loginErr || !loginRes ) {

					var theError = loginErr;

					if(!loginRes)
					{
					    theError = new Error('Login failed!');
					    theError.status = 501;
					}

					cb(theError);

					return false;
				};

				loginRes.peopleType = peopleFindRes.personType;
				
				cb(null, loginRes);
			})

		});
	};

	People.remoteMethod(
		'login', 
		{
    		description: "Logs in using People data",
			accepts: {arg: 'credentials', type: 'object', "http": {"source": "body"}},
			returns: {arg: 'user', type: 'object'},
      		http: { verb: 'POST', path: '/login' }
		}
	);

	People.createPeople = function( req, cb ) {

		People.create(req, function( peopleCreateErr, peopleCreateRes ) {

			if( peopleCreateErr || !peopleCreateRes || peopleCreateRes == null ) {

				console.log('peopleCreateErr', peopleCreateErr);

				var errorMessage = peopleCreateErr;

				if( !errorMessage )
					errorMessage =  new Error('Could not create username.');

				cb( errorMessage );

				return false;
			}

			User.create({
				email: req.email,
				password: req.password
			}, function( userCreateErr, userCreateRes ) {
				
				if( !userCreateRes || userCreateRes == null ) {
				
					console.log('userCreateErr', userCreateErr);

					var errorMessage = userCreateError; 

					if( !errorMessage )
						errorMessage = new Error('Could not create user.');

					cb( errorMessage );

					return false;
				};

				cb( null, peopleCreateRes );
			});

		});
	};

	People.remoteMethod(
		'createPeople', 
		{
    		description: "Create people with a User reference.",
			accepts: {arg: 'credentials', type: 'object', "http": {"source": "body"}},
			returns: {arg: 'user', type: 'object'},
      		http: { verb: 'POST', path: '/create-people' }
		}
	);
};
