export const environment = {
  production: false,
  firebase: {
    // exposing this due to auth lack of support of Vite's import.meta
    apiKey: "AIzaSyDbVAS2Rs26mctmygCzIu7XoQbOhe9Z2Wk", // https://stackoverflow.com/a/37484053/14701509
    authDomain: "junk-store-angular-58672.firebaseapp.com",
    projectId: "junk-store-angular-58672",
    storageBucket: "junk-store-angular-58672.appspot.com",
    messagingSenderId: "648426510585",
    appId: "1:648426510585:web:727b8b3fbc170e556c2a28",
    measurementId: "G-496V40WZ2B",
  },
};
