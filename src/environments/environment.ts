/// <reference types="vite/types/importMeta.d.ts" />

export const environment = {
  production: false,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "junk-store-angular-58672.firebaseapp.com",
    projectId: "junk-store-angular-58672",
    storageBucket: "junk-store-angular-58672.appspot.com",
    messagingSenderId: "648426510585",
    appId: "1:648426510585:web:727b8b3fbc170e556c2a28",
    measurementId: "G-496V40WZ2B",
  },
};
