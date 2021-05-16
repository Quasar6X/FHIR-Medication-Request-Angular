import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplexQueriesComponent } from './complex-queries.component';

const routes: Routes = [
  {
    path: '',
    component: ComplexQueriesComponent,
    data: { title: 'Complex Querries' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexQueriesRoutingModule { }
