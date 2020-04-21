import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Component({ 
    selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.less']
})
export class SettingsComponent {

    userTab = true;
    eventTaskTab = false;
    constructor(){}

    userTabClick() {
        let userTabElement = document.getElementById("user").classList.add("active");
        let eventTaskTabElement = document.getElementById("eventTask").classList.remove("active");
        this.userTab = true;
        this.eventTaskTab = false;
    }

    eventTaskTabClick() {
        let userTabElement = document.getElementById("user").classList.remove("active");
        let eventTaskTabElement = document.getElementById("eventTask").classList.add("active");
        this.userTab = false;
        this.eventTaskTab = true;
    }
}