import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBSas7Ux7KNECu-9mZfbg64k4_jj_aAWoE",
    authDomain: "ixo-onboarding.firebaseapp.com",
    databaseURL: "https://ixo-onboarding.firebaseio.com",
    projectId: "ixo-onboarding",
    storageBucket: "",
    messagingSenderId: "666806237560"
};
firebase.initializeApp(config);

export default firebase;