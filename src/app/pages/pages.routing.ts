import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '../guards/security.guard';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'pages', 
    component: PagesComponent,
    children: [
      { path: 'employee-search', component: EmployeeSearchComponent,canActivate:[SecurityGuard],},
      { path: '', component: EmployeeSearchComponent,canActivate:[SecurityGuard],},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
