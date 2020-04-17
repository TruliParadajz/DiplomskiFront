import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    { path: 'settings', component: SettingsComponent}
]

export const settingsRoutingModule = RouterModule.forChild(routes);