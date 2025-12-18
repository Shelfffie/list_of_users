import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const _dirname = path.resolve();
const serviceAccountPath = path.join(
  _dirname,
  "list-users-d7b6a-firebase-adminsdk-fbsvc-07bc62584f.json"
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://list-users-d7b6a-default-rtdb.firebaseio.com",
});

const db = admin.database();

export default db;
