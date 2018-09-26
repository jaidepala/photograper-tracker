import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		SignupRoutingModule
	],
	declarations: [SignupComponent]
})
export class SignupModule {}
