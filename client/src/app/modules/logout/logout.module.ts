import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		LogoutRoutingModule
	],
	declarations: [
		LogoutComponent
	]
})
export class LogoutModule {}
