import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsMedicationRequestPipe } from './as-medication-request.pipe';

@NgModule({
  declarations: [AsMedicationRequestPipe],
  imports: [
    CommonModule
  ],
  exports: [AsMedicationRequestPipe]
})
export class AsMedicationRequestModule { }
