import { memo, useState } from "react";
import { string, infer as Infer, object } from "zod";
import { UserInfo } from "models/users";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserInfo } from "@/services/users";
import { uploadFileToStorage } from "@/services/storage"; // Firebase Storage Helper
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
import { styled } from "@mui/material/styles";

// Validation Schema
const schema = object({
  name: string().min(3).max(30),
  username: string().min(3).max(30),
  bio: string().max(160).optional(),
  email_address: string().email(),
  links: object({
    website: string()
      .optional()
      .refine((url) => !url || isValidURL(url), {
        message: "Invalid URL",
      }),
    spotify: string()
      .optional()
      .refine((url) => !url || isValidURL(url), {
        message: "Invalid URL",
      }),
    itunes: string()
      .optional()
      .refine((url) => !url || isValidURL(url), {
        message: "Invalid URL",
      }),
    instagram: string()
      .optional()
      .refine((url) => !url || isValidURL(url), {
        message: "Invalid URL",
      }),
    twitter: string()
      .optional()
      .refine((url) => !url || isValidURL(url), {
        message: "Invalid URL",
      }),
  }).optional(),
});

// Helper Functions
const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const preprocessLinks = (links: Record<string, string | undefined>) => {
  return Object.fromEntries(
    Object.entries(links || {}).map(([key, value]) => [
      key,
      value && !value.startsWith("http") ? `https://${value}` : value,
    ])
  );
};

// Styled Components
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

type Schema = Infer<typeof schema>;

function ProfileEditorForm({ user, stopEditing }: { user: UserInfo; stopEditing: () => void }) {
  const [profileImage, setProfileImage] = useState(user.profile.image);
  const [coverImage, setCoverImage] = useState(user.profile.cover);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const formMethods = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.profile?.name || "",
      username: user?.profile?.username || "",
      bio: user?.profile?.bio || "",
      email_address: user?.profile?.email_address || "",
      links: user?.profile?.links || {},
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
      setUploadProgress(null); // Reset after upload completes
      if (type === "profile") {
        setProfileImage(fileUrl);
        setValue("image", fileUrl);
      } else if (type === "cover") {
        setCoverImage(fileUrl);
        setValue("cover", fileUrl);
      }
    }
  };

  const onSubmit = async (data: Schema) => {
    const links = preprocessLinks(data.links || {});
    await updateUserInfo(user.uid, { ...data, links, image: profileImage, cover: coverImage });
    stopEditing();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Image Upload */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar src={profileImage} sx={{ width: 80, height: 80 }} />
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, "profile")} />
          </IconButton>
        </Stack>

        {/* Upload Progress */}
        {uploadProgress !== null && <CircularProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />}

        {/* Cover Image Upload */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Typography>Cover Image</Typography>
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, "cover")} />
          </IconButton>
        </Stack>

        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Name" error={Boolean(errors.name)} helperText={errors.name?.message} fullWidth />
          )}
        />

        {/* Username Field (Disabled) */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Username"
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              fullWidth
              disabled
            />
          )}
        />

        {/* Bio Field */}
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <StyledTextField {...field} label="Bio" error={Boolean(errors.bio)} helperText={errors.bio?.message} fullWidth />
          )}
        />

        {/* Email Field (Disabled) */}
        <Controller
          name="email_address"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Email Address"
              error={Boolean(errors.email_address)}
              helperText={errors.email_address?.message}
              fullWidth
              disabled
            />
          )}
        />

        {/* Links Fields */}
        <Typography variant="h6" mt={3} mb={2} color="#FFFFFF">
          Social Links
        </Typography>
        {["website", "spotify", "itunes", "instagram", "twitter"].map((linkKey) => {
          const icons: Record<string, React.ReactNode> = {
            website: <LanguageIcon sx={{ mr: 1 }} />,
            spotify: <SpotifyIcon sx={{ mr: 1 }} />,
            itunes: <AppleIcon sx={{ mr: 1 }} />,
            instagram: <InstagramIcon sx={{ mr: 1 }} />,
            twitter: <TwitterIcon sx={{ mr: 1 }} />,
          };
          return (
            <Controller
              key={linkKey}
              name={`links.${linkKey}`}
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label={linkKey.charAt(0).toUpperCase() + linkKey.slice(1)}
                  InputProps={{
                    startAdornment: icons[linkKey],
                  }}
                  error={Boolean(errors.links?.[linkKey])}
                  helperText={errors.links?.[linkKey]?.message}
                  fullWidth
                />
              )}
            />
          );
        })}

        {/* Action Buttons */}
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
