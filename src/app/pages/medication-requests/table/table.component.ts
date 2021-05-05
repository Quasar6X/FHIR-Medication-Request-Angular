import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MedicationRequest } from '../../../shared/model/medication-request.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FbBaseService } from '../../../services/fb-base.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

    dataSource: MatTableDataSource<MedicationRequest>;
    columnData: string[] = ['status', 'statusReason', 'intent', 'priority', 'doNotPerform', 'reported', 'medication', 'subject', 'authoredOn'];
    columnHeaders: string[] = ['Status', 'Status Reason', 'Intent', 'Priority', 'Do not perform', 'Reported', 'Medication', 'Subject', 'Authored on date', 'Substitution allowed', 'Substitution reason'];
    subs: Subscription[] = [];
    expandedRequest: MedicationRequest | null;
    isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private service: FbBaseService, private dialog: MatDialog, private snackbar: MatSnackBar) {
        this.dataSource = new MatTableDataSource<MedicationRequest>();
    }

    ngOnInit(): void {
        this.subs.concat(this.service.get().subscribe(medicationRequests => {
            this.dataSource.data = medicationRequests;
            this.isLoading = false;
        }));
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    filter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddComponent, {width: '90vw', height: '90vh'});
        this.subs.concat(dialogRef.afterClosed().subscribe((request: MedicationRequest) => {
            this.isLoading = true;
            this.service.add(request).then(() => {
                this.isLoading = false;
                this.snackbar.open('Uploaded medication request', 'OK', {duration: 10000});
            });
        }, error => {
            this.snackbar.open(error.message, 'OK', {duration: 10000});
        }, () => {
            this.isLoading = false;
        }));
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => {
            if (sub !== null) {
                sub.unsubscribe();
            }
        });
    }
}
