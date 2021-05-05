import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';

@NgModule({
    imports: [RouterModule.forChild([{
        path: '',
        component: RegistrationComponent,
        data: { title: 'Register' }
    }])],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
