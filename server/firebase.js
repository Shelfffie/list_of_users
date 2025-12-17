import admin from "firebase-admin";
import serviceAccount from "./list-users-d7b6a-firebase-adminsdk-fbsvc-07bc62584f.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://list-users-d7b6a-default-rtdb.firebaseio.com",
});

const db = admin.database();

export default db;
