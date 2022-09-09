import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const createCustomToken = functions.https.onCall(async uid =>
  admin.auth().createCustomToken(uid),
);
