import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
  

encryptData(data, encryptionKey) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data, encryptionKey) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}
