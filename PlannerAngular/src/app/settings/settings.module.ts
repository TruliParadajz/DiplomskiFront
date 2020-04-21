import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { settingsRoutingModule } from './settings.routing';
import { EventtasksettingsComponent } from './eventtasksettings/eventtasksettings.component';
import { SettingsComponent } from './settings.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    UsersettingsComponent,
    EventtasksettingsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    settingsRoutingModule,
    MatSliderModule,
    MatSlideToggleModule, // here otherwise it's not possible to use the component mat-slide-toggle defined in this module
  ],
  exports: [
    UsersettingsComponent
  ]
})
export class SettingsModule { }
