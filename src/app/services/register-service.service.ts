import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';
import { FormGroup } from '@angular/forms';
import { LoginModel } from '../models/login-model';
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/Account/';
header = {
headers: new HttpHeaders({'content-type':'application/json'}),
withCredentials : true
};
    Register(reg: RegisterModel): Observable<RegisterModel> {
        return this.http.post<RegisterModel>(this.baseUrl + 'Register',reg,this.header).pipe();
    }

      GetAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.baseUrl + 'getAllUsers').pipe();
    }

    Login(login: LoginModel): Observable<LoginModel> {
      return this.http.post<LoginModel>(this.baseUrl + 'Login',login,this.header).pipe();
    }

    logout() {
      return this.http.get(this.baseUrl + 'Logout',{withCredentials : true}).pipe();
    }

    emailConfirm(id:string,token:string){
      return this.http.get(this.baseUrl + 'RegisterationConfirm?ID='+ id + '&Token=' + token).pipe();
    }

    userNameExists(username:string){
      return this.http.get(this.baseUrl+ "isUserNameExists?username=" + username).pipe();
    }
    emailNameExists(email:string){
      return this.http.get(this.baseUrl + "isEmailExists?email="+ email).pipe();
    }

}
