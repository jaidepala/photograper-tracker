import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: './modules/home/home.module#HomeModule'
	},
	{
		path: 'home',
		loadChildren: './modules/home/home.module#HomeModule'
	},
	{
		path: 'login',
		loadChildren: './modules/login/login.module#LoginModule'
	},
	{
		path: 'signup',
		loadChildren: './modules/signup/signup.module#SignupModule'
	},
	{
		path: 'about',
		loadChildren: './modules/about/about.module#AboutModule'
	},
	{ 
		path: '', 
		redirectTo: '/home', 
		pathMatch: 'full' 
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
