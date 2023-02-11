import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "./fbConfig.json";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export default app;

export const uploadToStorage = async (
  url: string,
  file: File | undefined,
  fileType?: string
): Promise<string> => {
  if (!file) throw "Provided File is undefined!";
  if (fileType && !file.type.includes(fileType)) throw "File doesn't match expected filetype!";
  if (file.size > 4 * 1024 * 1024) throw "File must be smaller than 4MB!";

  const imageRef = ref(storage, `${url}/${file.name}`);
  let imgUrl = "";
  console.log(`Uploading to ${url}/${file.name}`);
  await uploadBytes(imageRef, file)
    .then(async (snapshot) => {
      await getDownloadURL(imageRef)
        .then((url) => {
          imgUrl = url;
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  return imgUrl;
};
