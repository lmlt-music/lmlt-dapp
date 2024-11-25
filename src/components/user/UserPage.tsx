'use client';

import { memo, useEffect, useState } from "react";
import { UserInfo as User } from "models/users";
import { onUserInfoChanged } from "@/services/users";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from '@mui/material/Link';
import ProfileEditorForm from "./ProfileEditorForm";
import { Dialog } from "@mui/material";

const UserPageRoot = styled(Box)({
    width: '100%',
    backgroundColor: '#121212',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
});

const HeaderSection = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#333',
});

const ProfileImageContainer = styled(Box)({
    position: 'absolute',
    bottom: '-50px',
    left: '30px',
    border: '3px solid white',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
});

const TabsContainer = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px 0',
});

const TabButton = styled(Button)({
    color: '#fff',
    textTransform: 'none',
    fontSize: '16px',
    margin: '0 10px',
    borderBottom: '2px solid transparent',
    '&:hover': {
        borderBottom: '2px solid #fff',
    },
    '&.active': {
        borderBottom: '2px solid #ff4081',
    },
});

const ContentSection = styled(Box)({
    padding: '20px',
});

const WallSection = styled(Box)({
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#1d1d1d',
    borderRadius: '10px',
});

const WallInput = styled(TextField)({
    width: '100%',
    marginBottom: '15px',
    '& .MuiInputBase-root': {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '10px',
    },
});

const SongCard = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#1d1d1d',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
});

const SongDetails = styled(Box)({
    flex: 1,
    marginLeft: '10px',
});

const SongActions = styled(Stack)({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
});

function UserPage({ initialUser }: { initialUser: User | null }) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [activeTab, setActiveTab] = useState("Releases");
    const [wallPost, setWallPost] = useState("");
    const [wallPosts, setWallPosts] = useState<string[]>([]);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (initialUser?.uid) return onUserInfoChanged(initialUser.uid, setUser);
    }, [initialUser?.uid]);

    const toggleEditing = () => setEditing(!editing);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Releases":
                return (
                    <>
                        <SongCard>
                            <Avatar src="path_to_image" />
                            <SongDetails>
                                <Typography variant="h6">Mask Off</Typography>
                                <Typography variant="body2">Future · 300 Streams · 3 days ago</Typography>
                            </SongDetails>
                            <SongActions>
                                <IconButton>
                                    <FavoriteBorderIcon style={{ color: 'white' }} />
                                </IconButton>
                                <IconButton>
                                    <RepeatIcon style={{ color: 'white' }} />
                                </IconButton>
                                <Typography variant="body2">123</Typography>
                            </SongActions>
                        </SongCard>
                        <SongCard>
                            <Avatar src="path_to_image" />
                            <SongDetails>
                                <Typography variant="h6">Too Easy</Typography>
                                <Typography variant="body2">Future · 300 Streams · 3 days ago</Typography>
                            </SongDetails>
                            <SongActions>
                                <IconButton>
                                    <FavoriteBorderIcon style={{ color: 'white' }} />
                                </IconButton>
                                <IconButton>
                                    <RepeatIcon style={{ color: 'white' }} />
                                </IconButton>
                                <Typography variant="body2">123</Typography>
                            </SongActions>
                        </SongCard>
                    </>
                );
            case "Collectibles":
                return <Typography>Collectibles Content</Typography>;
            case "Repost":
                return <Typography>Repost Content</Typography>;
            case "Likes":
                return <Typography>Likes Content</Typography>;
            default:
                return null;
        }
    };

    const handleWallPostSubmit = () => {
        if (wallPost.trim()) {
            setWallPosts([wallPost, ...wallPosts]);
            setWallPost("");
        }
    };

    if (!user) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <UserPageRoot>
            {/* Header Section */}
            <HeaderSection style={{ backgroundImage: `url(${user.profile.cover || 'default_cover_image'})` }}>
                <ProfileImageContainer>
                    <Avatar
                        src={user.profile.image || 'default_profile_image'}
                        sx={{
                            width: '100px',
                            height: '100px',
                        }}
                    />
                </ProfileImageContainer>
            </HeaderSection>

            {/* Info Section */}
            <Box sx={{ padding: '20px 30px' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            {user.profile.name}
                        </Typography>
                        <Typography variant="body1" color="gray">
                            @{user.profile.username}
                        </Typography>
                        {user.profile.links.website && (
                            <Typography variant="body2" mt={1}>
                                <Link href={user.profile.links.website} target="_blank" color="inherit" underline="hover">
                                    {user.profile.links.website}
                                </Link>
                            </Typography>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#ff4081' }}
                        onClick={toggleEditing}
                    >
                        Edit Profile
                    </Button>
                </Stack>
                <Typography variant="body2" color="gray" mt={2}>
                    <b>{user.profile.total_following}</b> Following · <b>{user.profile.total_followers}</b> Followers
                </Typography>
            </Box>

            {/* Tabs Section */}
            <TabsContainer>
                {["Releases", "Collectibles", "Repost", "Likes"].map((tab) => (
                    <TabButton
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={activeTab === tab ? "active" : ""}
                    >
                        {tab}
                    </TabButton>
                ))}
            </TabsContainer>

            {/* Content Section */}
            <ContentSection>{renderTabContent()}</ContentSection>

            {/* Wall Section */}
            <WallSection>
                <WallInput
                    variant="outlined"
                    placeholder="Write something on the timeline..."
                    value={wallPost}
                    onChange={(e) => setWallPost(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#ff4081' }}
                    onClick={handleWallPostSubmit}
                >
                    Post
                </Button>
                <Box mt={2}>
                    {wallPosts.map((post, index) => (
                        <Box key={index} sx={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
                            <Typography>{post}</Typography>
                        </Box>
                    ))}
                </Box>
            </WallSection>

            {/* Edit Profile Dialog */}
            <Dialog open={editing} onClose={toggleEditing} fullWidth maxWidth="sm">
                <ProfileEditorForm user={user} stopEditing={toggleEditing} />
            </Dialog>
        </UserPageRoot>
    );
}

export default memo(UserPage);
