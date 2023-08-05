import CryptoJS from "crypto-js";
import { AESKEY } from "./key";
const encrypt = (text = "") => {
  const key = AESKEY;
  let x = CryptoJS.AES.encrypt(text, key).toString();
  return x.replace(/\//g, "-");
};
export default encrypt;
