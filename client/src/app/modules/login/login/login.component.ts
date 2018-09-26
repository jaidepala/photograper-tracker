import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../../environments/environment';
import { UserApi } from './../../../shared/sdk/index';
import { PeopleApi } from './../../../shared/sdk/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	// HTML & CSS
	// https://bootsnipp.com/snippets/featured/login-screen-with-form
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public login = {

		userName: '',
		password: '',

		loader: 0
	};

	public toast = Swal.mixin({
		toast: true,
		position: 'center-start',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(
		private user 	: UserApi,
		private people 	: PeopleApi,
		private cookieService: CookieService,
		private router 	: Router
	) {


	};

	ngOnInit() {


	};

	submitLogin() {

		var userName = this.login.userName,
			password = this.login.password;

		if( (!userName || userName == null) || (!password || password == null) )
		{
			if( !userName || userName == null )
			{
				this.toast({
					type: 'error',
					title: 'Please Enter Username...'
				});

				return false;
			}

			if( !password || password == null )
			{
				this.toast({
					type: 'error',
					title: 'Please Enter Password...'
				});

				return false;
			}
		}

		// disables the input
		this.login.loader = 1;

		Swal({
			title: 'Loading...',
			allowOutsideClick: false,
			allowEnterKey: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			text: 'Logging in to ' + userName,
			imageUrl: 'https://unsplash.it/400/200',
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: ''
		});

		// this.user.login({
		this.people.login({
			email: userName,
			password: password
		})
		.subscribe(( result ) => {

			this.login.loader = 2;

			this.cookieService.set( environment.COOKIES.LOGIN.ID, result.user.id );

			this.toast({
				type: 'success',
				title: 'Signed-in successfully!'
			});

			this.router.navigate(['/home']);

		}, err => {

			this.login.loader = 3;

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});

	};

}
