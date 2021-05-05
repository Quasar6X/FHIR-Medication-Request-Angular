import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: ProfileComponent,
            data: { title: 'Profile' }
        }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
