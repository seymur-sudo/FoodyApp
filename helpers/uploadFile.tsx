import { fileStorage } from "@/server/configs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const useFileHandling = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  

  const handleFileChange = async (
    file: File,
    onSuccess: (downloadURL: string) => void,
    onError: (error: any) => void
  ) => {
    const productId = `${new Date().getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
    const storageRef = ref(fileStorage, `products/${productId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading file:", error);
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setUploadedFile(downloadURL);
            onSuccess(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            onError(error);
          });
      }
    );
  };

  return { uploadedFile, handleFileChange };
};

export default useFileHandling;
