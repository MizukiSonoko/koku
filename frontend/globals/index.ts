import SecureLS from "secure-ls";

export const storageKey = "kuni";
export const secureStorage = new SecureLS({ isCompression: false });

const initialStoreContent = secureStorage.get(storageKey);

export const initialUnencryptedStorage = initialStoreContent
  ? JSON.parse(initialStoreContent)
  : {};