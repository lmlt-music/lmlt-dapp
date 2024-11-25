import { cache } from "react";
import { UserInfo, UserProfile, UserLocation, UserMetrics, UserPreferences, LegacyUser } from "models/users";
import { db } from "./db";

export const getUser = cache(async (userId: string): Promise<UserInfo | null> => {
    const userDoc = db.user(userId);
    const user = (await userDoc.get()).data();

    if (user && !user.migrated) { // Use 'migrated' property instead of 'migrated2025'
        await migrateUser(userId);
        return (await userDoc.get()).data() as UserInfo;
    }

    console.log('Got user:', user);
    return user ?? null;
});

export const getUserByIdOrUsername = cache(async (identifier: string): Promise<UserInfo | null> => {
    let userDoc;
    if (identifier.length === 28) {
        userDoc = db.user(identifier);
    } else {
        console.log("identifier:", identifier);
        const users = await db.users.where('profile.username', '==', identifier).get();
        console.log('Got users:', users.docs.length);
        if (users.empty) {
            return null;
        }
        userDoc = users.docs[0].ref;
    }

    const user = (await userDoc.get()).data();

    if (user && !user.migrated) {
        await migrateUser(user.uid);
        return (await userDoc.get()).data() as UserInfo;
    }

    console.log('Got user:', user);
    return user ?? null;
});

export const migrateUser = async (userId: string): Promise<void> => {
    const userDoc = db.user(userId);
    const user = (await userDoc.get()).data() as LegacyUser;

    if (user) {
        // Map LegacyUser to UserInfo
        const migratedUser: UserInfo = {
            uid: user.uid,
            fcmToken: user.fcmToken || "",
            isCreator: user.isArtist || false,
            migrated: true,
            profile: {
                image: user.photoUrl || "",
                cover: user.coverPhotoUrl || "",
                name: user.name || "",
                username: user.username || "",
                bio: user.bio || "",
                total_following: user.userFollowingCount || 0,
                total_followers: user.userFollowersCount || 0,
                email_address: user.email || "",
                links: {
                    website: "",
                    spotify: "",
                    itunes: "",
                    instagram: "",
                    twitter: ""
                },
                web3: {
                    public_address: ""
                }
            },
            location: {
                city: user.city || "",
                state: user.state || "",
                country: user.country || "",
                latitude: user.lat || 0,
                longitude: user.lng || 0,
                geohash: user.geohash || "",
                country_code: ""
            },
            metrics: {
                music_web_app: {
                    signInCount: 0
                },
                music_ios_app: {
                    version: user.appVersion || "",
                    openCount: 0
                },
                lastLogin: user.lastSignIn || 0,
                profile_visits: 0
            },
            isArtist: false
        };

        await userDoc.set(migratedUser);
        console.log('User migrated:', migratedUser);
    } else {
        // Create new user with default values
        const newUser: UserInfo = {
            uid: userId,
            fcmToken: "",
            isCreator: false,
            migrated: true,
            profile: {
                image: "",
                cover: "",
                name: "",
                username: "",
                bio: "",
                total_following: 0,
                total_followers: 0,
                email_address: "",
                links: {
                    website: "",
                    spotify: "",
                    itunes: "",
                    instagram: "",
                    twitter: ""
                },
                web3: {
                    public_address: ""
                }
            },
            location: {
                city: "",
                state: "",
                country: "",
                latitude: 0,
                longitude: 0,
                geohash: "",
                country_code: ""
            },
            metrics: {
                music_web_app: {
                    signInCount: 0
                },
                music_ios_app: {
                    version: "",
                    openCount: 0
                },
                lastLogin: 0,
                profile_visits: 0
            },
            isArtist: false
        };

        await userDoc.set(newUser);
        console.log('New user created:', newUser);
    }
};
