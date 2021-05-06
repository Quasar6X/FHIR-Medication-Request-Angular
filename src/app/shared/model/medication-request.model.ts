import { Note } from './note.model';
import { Dosage } from './dosage-instruction.model';
import { Category } from './category.model';
import { User } from './user.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MedicationRequest {
    id: string;                     // 1..1
    identifier?: User[];            // 0..*
    status: string;                 // 1..1
    statusReason?: string;          // 0..1
    intent: string;                 // 1..1
    category?: Category[];          // 0..*
    priority?: string;              // 0..1
    doNotPerform?: boolean;         // 0..1
    reported?: boolean;             // 0..1
    medication: string;             // 1..1
    subject: string;                // 1..1
    authoredOn?: Timestamp;         // 0..1
    note?: Note[];                  // 0..*
    dosageInstruction?: Dosage[];   // 0..*
    substitution?: {                // 0..1
        allowed: boolean; // 1..1
        reason?: string;  // 0..1
    };
}
