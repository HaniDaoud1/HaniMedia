const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/pc/Downloads/hanimedia-568b3-firebase-adminsdk-q2ao4-618511d47c.json"); // Corrected path with double backslashes
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "hanimedia-568b3.appspot.com", // Remplacez par l'ID de votre bucket
});

const bucket = admin.storage().bucket();

module.exports = bucket;
