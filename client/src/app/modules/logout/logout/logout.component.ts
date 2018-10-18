import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { UserApi } from './../../../shared/sdk/index';

import { UiService } from './../../../services/ui.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	public logout = {

		userName: ''
	};

	public toast = Swal.mixin({
		toast: true,
		position: 'center-start',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(
		private user 			: UserApi,
		private cookieService 	: CookieService,
		private router 			: Router,
		private ui 				: UiService
	) {

	};

	ngOnInit() {

		this.cookieService.delete( environment.COOKIES.LOGIN.ID );

		this.cookieService.delete( environment.COOKIES.LOGIN.EMAIL );
		
		this.cookieService.delete( environment.COOKIES.LOGIN.ACCESS_TOKEN );

		this.router.navigate(['/home']);

		this.user.logout()
		.subscribe(( result ) => {

			this.router.navigate(['/home']);

		}, err => {

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});

		});

	};

}
