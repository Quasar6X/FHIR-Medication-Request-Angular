import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'table-view',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'table-view',
                loadChildren: () => import('../medication-requests/table/table.module').then(m => m.TableModule)
            },
            {
                path: 'complex',
                loadChildren: () => import('../medication-requests/complex-queries/complex-queries.module').then(m => m.ComplexQueriesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
