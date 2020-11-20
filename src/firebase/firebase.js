import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    async register(user) {
        const newUser = await this.auth.createUserWithEmailAndPassword(user.email, user.password);

        return await newUser.user.updateProfile({
            displayName : `${user.name} ${user.lastName}`
        })
    }

    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async loginWithGoogle() {
        const provider = new app.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider);
    }

    async loginWithFacebook() {
        const provider = new app.auth.FacebookAuthProvider();
        return this.auth.signInWithPopup(provider);
    }

    async logout() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();

export default firebase;