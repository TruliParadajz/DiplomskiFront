import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_alert';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PlannerModule } from './planner/planner.module';

import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { LogotitleComponent } from './logotitle/logotitle.component';

import { SettingsModule } from './settings/settings.module';;
import { StatisticsComponent } from './statistics/statistics.component'

import { ChartsModule } from 'ng2-charts';
import { MatMenuModule } from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        PlannerModule,
        BrowserAnimationsModule,
        SettingsModule,
        ChartsModule,
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        LogotitleComponent,
        StatisticsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }