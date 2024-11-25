import { getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { getAuth, updateProfile } from 'firebase/auth';

import { db } from "./db";
import { UserInfo } from "models/users";

export const onUserInfoChanged = (userId: string, onChanged: (user: UserInfo | null) => void) => {
    return onSnapshot(db.user(userId), snapshot => {
        const user = snapshot.data() as UserInfo | undefined;
        console.log('Got user info:', user);
        onChanged(user ?? null);
    });
}

export const updateUserInfo = async (userId: string, userInfo: { profile: any; links?: any; image?: any; cover?: any; }) => {
    const user = getAuth().currentUser;
    if (!user)
        return;

    // // Update auth profile
    // if (user.displayName !== displayName || (imageUrl && user.photoURL !== imageUrl)) {
    //     await updateProfile(user, { displayName: displayName, photoURL: imageUrl });
    // }

    // Immediate update only if needed (updates are more expensive than reads)
    const existingUserInfo = (await getDoc(db.user(userId))).data() as UserInfo | undefined;
    if (existingUserInfo) {
        console.log(`Setting ${userId} info to`, existingUserInfo);
        await setDoc(db.user(userId), {
            ...existingUserInfo,
            ...userInfo,
            profile: {
                ...existingUserInfo.profile,
                ...userInfo.profile,
            }
        }, { merge: true });
    }
}
