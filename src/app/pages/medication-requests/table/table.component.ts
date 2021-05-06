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
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

interface TableData {
    columnData: string;
    columnHeader: string;
}

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
    columnData: TableData[] = [
        {columnData: 'status', columnHeader: 'Status'},
        {columnData: 'statusReason', columnHeader: 'Status Reason'},
        {columnData: 'intent', columnHeader: 'Intent'},
        {columnData: 'priority', columnHeader: 'Priority'},
        {columnData: 'doNotPerform', columnHeader: 'Do not perform'},
        {columnData: 'reported', columnHeader: 'Reported'},
        {columnData: 'medication', columnHeader: 'Medication'},
        {columnData: 'subject', columnHeader: 'Subject'},
        {columnData: 'authoredOn', columnHeader: 'Authored on'},
        {columnData: 'substitution.allowed', columnHeader: 'Substitution allowed'},
        {columnData: 'substitution.reason', columnHeader: 'Substitution reason'},
    ];
    columnDataStr: string[] = this.columnData.map(data => data.columnData);

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
            this.dataSource.sort = this.sort;
            this.isLoading = false;
        }));
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    filter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openAddRequestDialog(): void {
        this.isLoading = true;
        const dialogRef = this.dialog.open(AddComponent, {width: '90vw', height: '90vh'});
        this.subs.concat(dialogRef.afterClosed().subscribe((request: MedicationRequest) => {
            if (request?.status) {
                this.service.add(request).then(() => {
                    this.snackbar.open('Uploaded medication request', 'OK', {duration: 10000});
                });
            }
        }, error => {
            this.snackbar.open(error.message, 'OK', {duration: 10000});
        }, () => {
            this.isLoading = false;
        }));
    }

    openEditRequestDialog(request: MedicationRequest, event: MouseEvent): void {
        this.isLoading = true;
        event.stopPropagation();
        const dialogRef = this.dialog.open(EditComponent, {
            width: '90vw',
            height: '90vh',
            data: request
        });
        this.subs.concat(dialogRef.afterClosed().subscribe((medicationRequest: MedicationRequest) => {
            if (medicationRequest?.status) {
                this.service.update(medicationRequest).then(() => {
                    this.snackbar.open('Updated medication request', 'OK', {duration: 10000});
                });
            }
        }, error => {
            this.snackbar.open(error.message, 'OK', {duration: 10000});
        }, () => {
            this.isLoading = false;
        }));
    }

    openDeleteRequestDialog(id: string, event: MouseEvent): void {
        this.isLoading = true;
        event.stopPropagation();
        const dialogRef = this.dialog.open(DeleteComponent, {
            data: {
                uid: id
            }
        });
        this.subs.concat(dialogRef.afterClosed().subscribe((decision: boolean) => {
            if (decision === true) {
                this.service.delete(id).then(() => {
                    this.snackbar.open('Deleted medication request', 'OK', {duration: 10000});
                });
            }
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
