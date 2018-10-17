import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UiService {

    private _showLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showNavBarEmitter: Observable<boolean> = this._showLogin.asObservable();

	constructor() {};

    showNavBar(ifShow: boolean) {

        this._showLogin.next(ifShow);
    };

}
