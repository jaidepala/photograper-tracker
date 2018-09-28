import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SDKBrowserModule } from './shared/sdk/index';
import { NavbarComponent } from './components/navbar/navbar.component';

// Ref
// https://stackoverflow.com/q/44517737
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';
// import { MomentagoPipe } from './pipes/momentago.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
        // MomentagoPipe
    ],
    imports: [
        RouterModule,
        routing,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        SDKBrowserModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
