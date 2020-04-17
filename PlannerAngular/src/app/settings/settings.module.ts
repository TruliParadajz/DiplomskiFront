import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { settingsRoutingModule } from './settings.routing';
import { EventtasksettingsComponent } from './eventtasksettings/eventtasksettings.component';
import { SettingsComponent } from './settings.component';



@NgModule({
  declarations: [
    UsersettingsComponent,
    EventtasksettingsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    settingsRoutingModule
  ],
  exports: [
    UsersettingsComponent    
  ]
})
export class SettingsModule { }
