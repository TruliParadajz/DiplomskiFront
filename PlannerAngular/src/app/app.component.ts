import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import {SignalRService} from '@app/_signalR-service/signal-r.service';
import { User } from './_models';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public signalRService: SignalRService,
        private http: HttpClient,
        
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.signalRService.startConnection();
        this.signalRService.addDataListener();
        this.startHttpRequest();
    }

    private startHttpRequest = () => {
        this.http.get('https://localhost:44364/api/notification')
            .subscribe(res => {
                // reset alerts on submit
                // this.alertService.clear();
                // this.alertService.success('Alert successful', false);
                console.log("signalR");
                console.log(res);
            })
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}