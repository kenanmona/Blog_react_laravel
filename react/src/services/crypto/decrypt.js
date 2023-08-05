import CryptoJS from "crypto-js";
import { AESKEY } from "./key";

const decrypt = (cipher = "") => {
  const key = AESKEY;
  return CryptoJS.AES.decrypt(cipher.replace(/-/g, "/"), key).toString(
    CryptoJS.enc.Utf8
  );
};
export default decrypt;
