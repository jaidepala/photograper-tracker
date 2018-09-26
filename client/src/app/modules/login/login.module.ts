import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		LoginRoutingModule
	],
	providers: [
		CookieService
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule {}
