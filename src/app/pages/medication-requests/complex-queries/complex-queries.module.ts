import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexQueriesRoutingModule } from './complex-queries-routing.module';
import { ComplexQueriesComponent } from './complex-queries.component';
import { ContainerModule } from '../../../shared/components/container/container.module';
import { MatCardModule } from '@angular/material/card';
import { AsMedicationRequestModule } from '../../../shared/components/cast/as-medication-request.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ComplexQueriesComponent
  ],
    imports: [
        CommonModule,
        ComplexQueriesRoutingModule,
        ContainerModule,
        MatCardModule,
        AsMedicationRequestModule,
        DragDropModule,
    ]
})
export class ComplexQueriesModule { }
