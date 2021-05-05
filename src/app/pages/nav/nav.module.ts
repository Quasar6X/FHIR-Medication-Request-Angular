import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        NavComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [NavComponent]
})
export class NavModule {
}
