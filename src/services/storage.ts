import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadFileToStorage = async (
  uid: string,
  file: File,
  type: "profile" | "cover",
  onProgress?: (progress: number) => void
) => {
  const storage = getStorage();
  const fileRef = ref(storage, `${uid}/${type}-${file.name}`);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Uploaded file:', downloadURL);
        resolve(downloadURL);
      }
    );
  });
};
