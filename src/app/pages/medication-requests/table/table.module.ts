import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ContainerModule } from '../../../shared/components/container/container.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AsMedicationRequestModule } from '../../../shared/components/cast/as-medication-request.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddModule } from '../add/add.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteModule } from '../delete/delete.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditModule } from '../edit/edit.module';


@NgModule({
  declarations: [
    TableComponent
  ],
    imports: [
        CommonModule,
        TableRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        ContainerModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
        MatListModule,
        AsMedicationRequestModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatDialogModule,
        AddModule,
        MatSnackBarModule,
        DeleteModule,
        MatTooltipModule,
        EditModule
    ]
})
export class TableModule { }
