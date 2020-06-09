import { Routes, RouterModule } from '@angular/router';
import { PlannerViewComponent } from './planner-view';
import { ListViewComponent } from './list-view/list-view.component';

const routes : Routes = [
    { path: 'calendar-view', component: PlannerViewComponent},
    { path: 'list-view', component: ListViewComponent}
]

export const plannerRoutingModule = RouterModule.forChild(routes);