import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Note {
    author?: {
        authorString: string;
    };
    time?: Timestamp;
    text: string;
}
