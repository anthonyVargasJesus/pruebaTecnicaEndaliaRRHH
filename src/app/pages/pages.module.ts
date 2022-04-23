import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    EmployeeSearchComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    EmployeeSearchComponent,
    PagesComponent,
  ]

})
export class PagesModule { }
