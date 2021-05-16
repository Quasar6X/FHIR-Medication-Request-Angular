import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentSnapshot, Query } from '@angular/fire/firestore';
import { MedicationRequest } from '../shared/model/medication-request.model';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
    providedIn: 'root'
})
export class FbBaseService {

    static readonly MEDICATION_REQUESTS_COLLECTION_NAME: string = 'MedicationRequests';

    constructor(private angularFirestore: AngularFirestore) {
    }

    async add(medicationRequest: MedicationRequest, collectionName?: string): Promise<string> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        const uid = this.angularFirestore.createId();
        medicationRequest.id = uid;
        await this.angularFirestore.collection(collectionName).doc(uid).set(medicationRequest);
        return uid;
    }

    // weakAdd(medicationRequest: MedicationRequest, collectionName?: string): Promise<DocumentReference<MedicationRequest>> {
    //     if (collectionName === undefined) {
    //         collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
    //     }
    //     return this.angularFirestore.collection(collectionName).add(medicationRequest) as Promise<DocumentReference<MedicationRequest>>;
    // }

    // get(collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME): Observable<MedicationRequest[]> {
    //     return this.angularFirestore.collection(collectionName, ref => {
    //         let query: CollectionReference | Query = ref;
    //         query = query.orderBy('subject', 'asc');
    //         return query;
    //     }).valueChanges() as Observable<MedicationRequest[]>;
    // }

    get(limit?: number, orderBy?: { fieldPath: string, direction?: OrderByDirection }, startAt?: DocumentSnapshot<MedicationRequest>, parent?: any,
        parentId = 'parentId', opStr: WhereFilterOp = '==',
        collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME): Observable<MedicationRequest[]> {
        return this.angularFirestore.collection(collectionName, ref => {
            let query: CollectionReference | Query = ref;
            if (parent) {
                query = query.where(parentId, opStr, parent);
            }
            if (limit) {
                query = query.limit(limit);
            }
            if (orderBy?.fieldPath && orderBy?.direction) {
                query = query.orderBy(orderBy.fieldPath, orderBy.direction);
            } else {
                query = query.orderBy('id');
            }
            if (startAt) {
                query = query.startAt(startAt[orderBy?.fieldPath ? orderBy.fieldPath : 'id']);
            }
            return query;
        }).valueChanges() as Observable<MedicationRequest[]>;
    }

    // getByID(id: string, collectionName?: string): Observable<MedicationRequest> {
    //     if (collectionName === undefined) {
    //         collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
    //     }
    //     return this.angularFirestore.collection(collectionName).doc(id).valueChanges() as Observable<MedicationRequest>;
    // }

    update(medicationRequest: MedicationRequest, collectionName?: string): Promise<void> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).doc(medicationRequest.id).update(medicationRequest);
    }

    delete(id: string, collectionName?: string): Promise<void> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).doc(id).delete();
    }
}
