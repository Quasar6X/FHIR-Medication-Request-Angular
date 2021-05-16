import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicationRequest } from '../../../shared/model/medication-request.model';
import { FbBaseService } from '../../../services/fb-base.service';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-complex-queries',
    templateUrl: './complex-queries.component.html',
    styleUrls: ['./complex-queries.component.scss']
})
export class ComplexQueriesComponent implements OnInit, OnDestroy {

    complexQueriesOne: MedicationRequest[];
    complexQueriesTwo: MedicationRequest[];
    subs: Subscription[] = [];

    constructor(private service: FbBaseService) {
    }

    ngOnInit(): void {
        this.subs.push(this.service.get(undefined, { fieldPath: 'dosageInstruction', direction: 'asc'},
            undefined, [], 'dosageInstruction', '!=').subscribe(arr => this.complexQueriesOne = arr));
        this.subs.push(this.service.get(undefined, { fieldPath: 'status', direction: 'desc'},
            undefined, 'completed', 'status', '!=').subscribe(arr => this.complexQueriesTwo = arr));
    }

    drop(event: CdkDragDrop<MedicationRequest[]>, array: MedicationRequest[]): void {
        moveItemInArray(array, event.previousIndex, event.currentIndex);
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => {
            if (sub !== null) {
                sub.unsubscribe();
            }
        });
    }
}
