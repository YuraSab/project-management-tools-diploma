import {collection, doc, getDoc, getDocs, query, setDoc, where, documentId, updateDoc, orderBy, limit} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UserProfile} from "../types/user.ts";

export const createUser = async ({ user }: Partial<UserProfile> & { id: string }): Promise<void> => {
    const userRef = doc(db, 'users', user.uid);
    const profile = {
        uid: user.uid,
        email: user.email,  // todo - всюди при реєстрації потрібно зробити email .toLowerCase()
        displayName: user.displayName || "User",
        photoURL: user.photoURL || null,
        role: user.role || "member",
        createdAt: new Date().toISOString(),
    };
    return await setDoc(userRef, profile);
};

export const getUser = async (userId: string): Promise<UserProfile | null> => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return {
        uid: userSnap.id,
        ...userSnap.data()
    } as UserProfile;
};

export const getUsersByIds = async (usersIds: string[]): Promise<UserProfile[]> => {
    if (usersIds.length < 1) return [];
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef, where(documentId(), 'in', usersIds ));
    const usersSnap = await getDocs(usersQuery);
    return usersSnap.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data()
    } as UserProfile));
};

export const searchUsersByEmail = async (searchTerm: string): Promise<UserProfile[]> => {
    if (searchTerm === '') return [];
    const strStart = searchTerm.toLowerCase();
    // Створюємо верхню межу для пошуку.
    // Додавання символу '\uf8ff' (останній символ Unicode) дозволяє знайти всі рядки,
    // що починаються з strSearch.
    const strEnd = strStart + '\uf8ff';
    const usersRef = collection(db ,'users');
    const usersQuery = query(
      usersRef,
        orderBy('email'),
        where('email', '>=', strStart),
        where('email', '<=', strEnd),
        limit(10)
    );
    const usersSnap = await getDocs(usersQuery);

    return usersSnap.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data()
    } as UserProfile));
};

export const updateUser = async (user : Partial<UserProfile> & { uid: string }): Promise<void> => {
    const { uid, ...rest } = user;
    const userRef = doc(db, 'users', uid);
    return await updateDoc(userRef, rest);
};

