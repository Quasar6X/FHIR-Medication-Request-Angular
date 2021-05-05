import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../shared/guard/auth.guard';

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
                loadChildren: () => import('../medication-requests/table/table.module').then(m => m.TableModule),
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
