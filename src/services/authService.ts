import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";

export const authService = {
    login: async (email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password);
    },
    register: async (email: string, password: string, name: string) => {
        // 1. Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // 2. Update displayName in firebase profile (щоб name підтягувався в AuthProvider)
        await updateProfile(user, { displayName: name });
        // 3. Create user in firestore to manage their data
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: "admin", // todo - temporary role
            reservedMembers: [],
            createdAt: new Date().toISOString()
        });
        return user;
    },
    logout: async () => {
        return await signOut(auth);
    }
};