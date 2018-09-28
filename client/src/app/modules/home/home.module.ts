import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { MomentagoPipe } from './../../pipes/momentago.pipe';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		HomeRoutingModule
	],
	providers: [
		CookieService
	],
	declarations: [
		HomeComponent,
		NotFoundComponent,
		LoadingComponent,
		MomentagoPipe
	]
})
export class HomeModule {}
