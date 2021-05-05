import { Pipe, PipeTransform } from '@angular/core';
import { MedicationRequest } from '../../model/medication-request.model';

@Pipe({
    name: 'asMedicationRequest',
    pure: true
})
export class AsMedicationRequestPipe implements PipeTransform {

    transform(value: any, ...args: any[]): MedicationRequest {
        return value as MedicationRequest;
    }
}
