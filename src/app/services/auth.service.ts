import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,private service: CryptService) { }

   installStorage(remember:boolean,email:string){

    const day = new Date();
    if (remember) {
        day.setDate(day.getDay() + 10);
    }else{
      day.setMinutes(day.getMinutes() + 1);
    }

        localStorage.setItem('email',this.service.Encrpt(email));
        localStorage.setItem('expire',this.service.Encrpt(day.toString()));

        this.getRoleName(email).subscribe(success => {
          localStorage.setItem("role",this.service.Encrpt(success.toString()));
  },err => console.log(err));
}

 checkStorage(){

    var email = this.service.Decrypt(localStorage.getItem('email'));
    var expire =  this.service.Decrypt(localStorage.getItem('expire'));
    var role =  this.service.Decrypt(localStorage.getItem('role'));

    this.ValidateUser(email,role).subscribe(successs => {
      if(!this.isExpiredDate(expire)){
        console.log("user is authorized");
          return true;
       }else
       {
        return false;
       }

     },err => console.log(err));
 return false;
}

  getRoleName(email:string) {
     return this.http.get("http://localhost:5000/Account/GetRoleName/" + email,{responseType : "text"}).pipe();
  }

  ValidateUser(email:string,role:string) {
     return this.http.get("http://localhost:5000/Account/CheckUserClaims/" + email + "&" + role,{withCredentials:true}).pipe();
  }

  isExpiredDate(day :string){
      const dateNaow = new Date();
      const dateExpire = new Date(Date.parse(day));
      if (dateExpire < dateNaow) {
        return true;
      }
      return false;
  }

}
