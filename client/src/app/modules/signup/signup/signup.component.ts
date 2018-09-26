import { Component, OnInit } from '@angular/core';
import { UserApi } from './../../../shared/sdk/index';
import { PeopleApi } from './../../../shared/sdk/index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signup',
	// HTML & CSS
	// https://bootsnipp.com/snippets/featured/bootstrap-dual-design-registration-form
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	public signup = {

		loader: 0,

		person: {

			firstName: '',
			lastName: '',
			email: '',
			password: '',
			cpassword: '',
			phone: '',
			gender: '',
			personType: 'photographer'
		}
	};

	public toast = Swal.mixin({
		toast: true,
		position: 'center-start',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(
		private user: UserApi,
		private people: PeopleApi,
		private router: Router
	) {

		console.log(this.people);
	};

	ngOnInit() {};

	chooseGender( gender ) {

		this.signup.person.gender = gender;
	};

	changePersonType( personType ) {

		this.signup.person.personType = personType;
	};

	checkForEmail() {

		var email = this.signup.person.email;

		this.signup.loader = 1;

		this.people.count({
			"email": email
		})
		.subscribe(( result ) => {

			this.signup.loader = 2;

			if(result && result.count > 0)
			{
				this.toast({
					type: 'error',
					title: 'Email already exists!'
				});

				return false;
			}

			this.addPeople();

		}, err => {

			this.signup.loader = 3;

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});
	};	

	addPeople() {

		var firstName 	= this.signup.person.firstName,
			lastName 	= this.signup.person.lastName,
			email 		= this.signup.person.email,
			password 	= this.signup.person.password,
			cpassword 	= this.signup.person.cpassword,
			phone 		= this.signup.person.phone,
			personType	= this.signup.person.personType,
			gender 		= this.signup.person.gender;

		this.people.create({
			"firstname": firstName,
			"lastname": lastName,
			"gender": gender,
			"email": email,
			"phone": phone,
			"password": password,
			"personType": personType
		})
		.subscribe(( result ) => {

			this.signup.loader = 2;

			this.toast({
				type: 'success',
				title: 'Signed-up successfully!'
			});

			this.router.navigate(['/login']);
		}, err => {

			this.signup.loader = 3;

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});
	};

	validatePeople( ) {

		var firstName 	= this.signup.person.firstName,
			lastName 	= this.signup.person.lastName,
			email 		= this.signup.person.email,
			password 	= this.signup.person.password,
			cpassword 	= this.signup.person.cpassword,
			phone 		= this.signup.person.phone,
			personType	= this.signup.person.personType,
			gender 		= this.signup.person.gender;

		if((!firstName || !lastName || !email || !password || !cpassword || !phone || !gender) || (password != cpassword)) {

			var missingParam = '';

			if(!gender)
				missingParam = 'gender';
			if(!phone)
				missingParam = 'phone';
			if(!password)
				missingParam = 'password';
			if(!email)
				missingParam = 'email';
			if(!lastName)
				missingParam = 'last name';
			if(!firstName)
				missingParam = 'first name';

			var msg = 'Please enter ' + missingParam + '.';

			if(password != cpassword)
				msg = 'Passwords do not match.';

			this.toast({
				type: 'error',
				title: msg
			});

			return false;
		};

		this.checkForEmail();
	};

}
