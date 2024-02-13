import { fileStorage } from "../server/configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSidebarContext } from "../contexts/SidebarContext";
import { SidebarContextProps } from "../interfaces/index";

const useImageUpload = () => {
  const { setNewImg } = useSidebarContext() as SidebarContextProps;

  const handleImageUpload = async (file: File) => {
    try {
      //setNewImg(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImg(reader.result as string);
      };

      const categorytId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 10000
      )}`;
      const storagePath = `images/${file.name + categorytId}`;
      const imageRef = ref(fileStorage, storagePath);

      const snapshot = await uploadBytes(imageRef, file);
      console.log("File uploaded successfully:", snapshot);

      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Firebase Storage URL: ", downloadURL);
      setNewImg(downloadURL);

      return downloadURL;
    } catch (error) {
      console.error("Error during file upload:", error);
      throw error;
    }
  };

  return { handleImageUpload };
};

export default useImageUpload;
