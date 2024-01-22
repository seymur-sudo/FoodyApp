// firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = require("./foodyapp-bfe77-firebase-adminsdk-5cqoy-76cc60156f.json"); // Replace with your own path

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;
