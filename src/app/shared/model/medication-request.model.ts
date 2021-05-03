import { Identifier } from './identifier.model';
import { Note } from './note.model';
import { Dosage } from './dosage.model';
import { Category } from './category.model';

export interface MedicationRequest {
    id: string;
    identifier?: {
        uid: Identifier;
        email: Identifier;
    };
    status: string;
    statusReason?: string;
    intent: string;
    category?: Category[];
    priority?: string;
    doNotPerform: boolean;
    reported?: boolean;
    medication: string;
    subject: string;
    authoredOn?: string;
    note?: Note[];
    dosageInstruction?: Dosage[];
    substitution?: {
        allowed: boolean;
        reason?: string;
    };
}
