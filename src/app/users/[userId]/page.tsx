import UserPage from '@/components/user/UserPage';
import {getUser, getUserByIdOrUsername} from "@/server/users";

export default async function Page({params: {userId}}: {
    params: { userId: string}
}) {
    const user = await getUserByIdOrUsername(userId);
    console.log('Server user:', user);
    return <UserPage initialUser={user} />
}
