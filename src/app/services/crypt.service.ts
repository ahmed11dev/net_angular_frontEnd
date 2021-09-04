import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

 iv = CryptoJS.enc.Utf8.parse('1562451865152654');
 secretKey = '451629$%^&#$^%54';

Encrpt(vlaue:string) : string{
const key = CryptoJS.enc.Utf8.parse(this.secretKey);
const iv = CryptoJS.enc.Utf8.parse(this.secretKey);
const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(vlaue.toString()),key,
{
  keySize:128 / 8,
  iv,
  mode:CryptoJS.mode.CBC,
  padding:CryptoJS.pad.Pkcs7
});
return encrypted.toString();
}

Decrypt(vlaue:string) : string{
  const key = CryptoJS.enc.Utf8.parse(this.secretKey);
  const iv = CryptoJS.enc.Utf8.parse(this.secretKey);
  const decrypted = CryptoJS.AES.decrypt(vlaue,key,
  {
    keySize:128 / 8,
    iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
