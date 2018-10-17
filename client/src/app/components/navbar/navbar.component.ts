import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

import { UiService } from '../../services/ui.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public showLogin: boolean = this.cookieService.get( environment.COOKIES.LOGIN.ID ) ? false : true;

	constructor(
		private ref 			: ChangeDetectorRef,
		private cookieService 	: CookieService,
		private ui 				: UiService
	) {
	};

	ngOnInit() {

        this.ui.showNavBarEmitter.subscribe((mode)=>{
            
            this.showLogin = mode;
        });
	};

}
