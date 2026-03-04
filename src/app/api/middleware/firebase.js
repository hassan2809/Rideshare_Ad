import admin from "firebase-admin";
import { Buffer } from "buffer";
import crypto from "crypto";

if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    universe_domain: "googleapis.com",
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const bucket = admin.storage().bucket();

export const uploadFileToFirebase = async (file, folder = "uploads/") => {
  if (!file) throw new Error("No file provided");

  // Convert to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a hash to use as a unique file name
  const hash = crypto.createHash("sha256").update(buffer).digest("base64url"); // ~43 chars
  const ext = file.name.split(".").pop();
  const fileName = `${folder}${hash}.${ext}`;
  const fileRef = bucket.file(fileName);

  // Check if file already exists
  const [exists] = await fileRef.exists();
  if (exists) {
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  }

  return new Promise((resolve, reject) => {
    const stream = fileRef.createWriteStream({
      metadata: { contentType: file.type },
    });

    stream.on("error", (err) => reject(err));

    stream.on("finish", async () => {
      await fileRef.makePublic();
      resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    });

    stream.end(buffer);
  });
};
