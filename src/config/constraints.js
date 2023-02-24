import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const dbtest = require('./db_config.js');

const config = {
    apiKey: dbtest.FB_API_KEY,
    authDomain: dbtest.FB_AUTH_DOMAIN,
    databaseURL: dbtest.FB_DATABASE_URL,
    projectId: dbtest.FB_PROJECT_ID,
    storageBucket: dbtest.FB_STORAGE_BUCKET,
    messagingSenderId: dbtest.FB_MESSAGING_SENDER_ID,
    appId: dbtest.FB_APP_ID
}

const app = initializeApp(config);
export const db = getFirestore(app);