import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';

const routes: Routes = [
  { path: 'list-employee', component: ListEmployeeComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'editEmployee/:id', component: CreateEmployeeComponent },
  { path: '', redirectTo:'list-employee', pathMatch:'full' },
  { path: '**', redirectTo:'list-employee', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
