import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentReference, Query } from '@angular/fire/firestore';
import { MedicationRequest } from '../shared/model/medication-request.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FbBaseService {

    static readonly MEDICATION_REQUESTS_COLLECTION_NAME: string = 'MedicationRequests';

    constructor(private angularFirestore: AngularFirestore) {
    }

    async add(medicationRequest: MedicationRequest, collectionName?: string, id?: string): Promise<string> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        const uid = id ? id : this.angularFirestore.createId();
        medicationRequest.id = uid;
        await this.angularFirestore.collection(collectionName).doc(uid).set(medicationRequest);
        return uid;
    }

    weakAdd(medicationRequest: MedicationRequest, collectionName?: string): Promise<DocumentReference<MedicationRequest>> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).add(medicationRequest) as Promise<DocumentReference<MedicationRequest>>;
    }

    get(collectionName?: string): Observable<MedicationRequest[]> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName, ref => {
            let query: CollectionReference | Query = ref;
            query = query.orderBy('subject', 'asc');
            return query;
        }).valueChanges() as Observable<MedicationRequest[]>;
    }

    getByID(id: string, collectionName?: string): Observable<MedicationRequest> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).doc(id).valueChanges() as Observable<MedicationRequest>;
    }

    update(id: string, medicationRequest: MedicationRequest, collectionName?: string): Promise<void> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).doc(id).update(medicationRequest);
    }

    delete(id: string, collectionName?: string): Promise<void> {
        if (collectionName === undefined) {
            collectionName = FbBaseService.MEDICATION_REQUESTS_COLLECTION_NAME;
        }
        return this.angularFirestore.collection(collectionName).doc(id).delete();
    }
}
