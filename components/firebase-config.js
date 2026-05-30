/* ============================================================
   SHARED, LIVE VOTING  —  optional Firebase backend
   ============================================================
   While this is null, voting works PER-DEVICE (saved only on each
   phone). Fill it in to make votes SHARED & LIVE across everyone.

   ONE-TIME SETUP (~10 minutes, free):
   1. Go to https://console.firebase.google.com  →  "Add project"
      (any name, e.g. "koffman-trip"). You can skip Google Analytics.
   2. In the left menu:  Build → Realtime Database → "Create Database"
      → pick a location → start in "Test mode".
   3. Open the "Rules" tab of the Realtime Database and paste exactly:
        {
          "rules": {
            "votes": { ".read": true, ".write": true }
          }
        }
      …then "Publish". (Open on /votes only — fine for a family poll.)
   4. Project Settings (⚙️) → "Your apps" → click the Web icon  </>
      → register an app → copy the `firebaseConfig` object it shows.
   5. Replace `null` below with that object, then commit & push.
      Make sure it INCLUDES `databaseURL` (ends with .firebaseio.com).

   Once pushed, everyone's 👍 sync live across all devices in real time.
   ============================================================ */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAwMTzrRhPG2nzWDyFrJ5AJ7lr0efoQ_8s",
  authDomain: "koffman-trip-2026.firebaseapp.com",
  databaseURL: "https://koffman-trip-2026-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "koffman-trip-2026",
  storageBucket: "koffman-trip-2026.firebasestorage.app",
  messagingSenderId: "1055178823847",
  appId: "1:1055178823847:web:da8b64c6081ab9f153e382"
};

/* Example of what it looks like once pasted:
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "koffman-trip.firebaseapp.com",
  databaseURL: "https://koffman-trip-default-rtdb.firebaseio.com",
  projectId: "koffman-trip",
  storageBucket: "koffman-trip.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
};
*/
