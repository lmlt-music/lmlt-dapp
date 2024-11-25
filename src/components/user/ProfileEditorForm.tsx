import { memo, useState } from "react";
import { string, object, infer as Infer } from "zod";
import { UserInfo } from "models/users";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserInfo } from "@/services/users";
import { uploadFileToStorage } from "@/services/storage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AppleIcon from "@mui/icons-material/Apple";
import SpotifyIcon from "@mui/icons-material/LibraryMusic";
import TikTokIcon from "@mui/icons-material/MusicNote"; // Replace with TikTok icon
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";

// Schema for Validation
const schema = object({
  profile: object({
    name: string().min(3).max(30),
    username: string().min(3).max(30),
    bio: string().max(160).optional(),
    email_address: string().email(),
    image: string().optional(),
    cover: string().optional(),
    links: object({
      website: string().optional().nullable(),
      spotify: string().optional().nullable(),
      itunes: string().optional().nullable(),
      instagram: string().optional().nullable(),
      twitter: string().optional().nullable(),
      tiktok: string().optional().nullable(),
      youtube: string().optional().nullable(),
    }).optional(),
  }),
});

type Schema = Infer<typeof schema>;

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#18171C",
    borderRadius: "8px",
    color: "#FFFFFF",
  },
  "& .MuiInputLabel-root": {
    color: "#8A92B2",
  },
});

function ProfileEditorForm({ user, stopEditing }: { user: UserInfo; stopEditing: () => void }) {
  const [profileImage, setProfileImage] = useState(user.profile.image);
  const [coverImage, setCoverImage] = useState(user.profile.cover);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const formMethods = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      profile: {
        name: user.profile.name,
        username: user.profile.username,
        bio: user.profile.bio,
        email_address: user.profile.email_address,
        image: user.profile.image,
        cover: user.profile.cover,
        links: user.profile.links,
      },
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = formMethods;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      const fileUrl = await uploadFileToStorage(user.uid, file, type, (progress) => {
        setUploadProgress(progress);
      });
      setUploadProgress(null);
      if (type === "profile") {
        setProfileImage(fileUrl);
        setValue("profile.image", fileUrl, { shouldValidate: true });
      } else if (type === "cover") {
        setCoverImage(fileUrl);
        setValue("profile.cover", fileUrl, { shouldValidate: true });
      }
    }
  };

  const onSubmit = async (data: Schema) => {
    await updateUserInfo(user.uid, { profile: data.profile });
    stopEditing();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar src={profileImage} sx={{ width: 80, height: 80 }} />
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, "profile")} />
          </IconButton>
        </Stack>

        {uploadProgress !== null && <CircularProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />}

        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Typography>Cover Image</Typography>
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, "cover")} />
          </IconButton>
        </Stack>

        <Controller
          name="profile.name"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Name" error={Boolean(errors.profile?.name)} helperText={errors.profile?.name?.message} fullWidth />
          )}
        />

        <Controller
          name="profile.username"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Username" disabled fullWidth />
          )}
        />

        <Controller
          name="profile.bio"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Bio" error={Boolean(errors.profile?.bio)} helperText={errors.profile?.bio?.message} fullWidth />
          )}
        />

        <Controller
          name="profile.email_address"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Email" disabled fullWidth />
          )}
        />

        <Typography variant="h6" mt={3} mb={2} color="#FFFFFF">
          Social Links
        </Typography>
        {(["website", "spotify", "itunes", "instagram", "twitter", "tiktok", "youtube"] as const).map((key) => (
          <Controller
            key={key}
            name={`profile.links.${key}`}
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                InputProps={{
                  startAdornment: (
                    {
                      website: <LanguageIcon sx={{ mr: 1 }} />,
                      spotify: <SpotifyIcon sx={{ mr: 1 }} />,
                      itunes: <AppleIcon sx={{ mr: 1 }} />,
                      instagram: <InstagramIcon sx={{ mr: 1 }} />,
                      twitter: <TwitterIcon sx={{ mr: 1 }} />,
                      tiktok: <TikTokIcon sx={{ mr: 1 }} />,
                      youtube: <YouTubeIcon sx={{ mr: 1 }} />,
                    }[key]
                  ),
                }}
                error={Boolean(errors.profile?.links?.[key])}
                helperText={errors.profile?.links?.[key]?.message}
                fullWidth
              />
            )}
          />
        ))}

        <Stack direction="row" spacing={2} mt={3}>
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#ff4081" }}>
            Save
          </Button>
          <Button onClick={stopEditing} variant="outlined">
            Cancel
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export default memo(ProfileEditorForm);
