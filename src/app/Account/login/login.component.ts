import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { RegisterModel } from 'src/app/models/register-model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service:RegisterServiceService,
              private route : Router,
              private auth : AuthService
              ) { }

  LoginMessage: string;
  loginForm: FormGroup;
  loginModel: LoginModel;

  messageValidate={

    email:{
      required:'please add your email',
    },
    password:{
      required:'please add your password',
    }
  };

  ngOnInit(): void {

    this.LoginMessage ='';

    this.loginModel = {
      remember:false,
      email:'',
      password:''
    };

    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      remember:false
    });
  }

  Login(){
    if (this.loginForm.valid) {
        this.validateModel();
        this.service.Login(this.loginModel).subscribe(success => {
      const remember = !!this.loginForm.value.remember;
          const email = this.loginForm.value.email;
          this.auth.installStorage(remember,email);

            this.route.navigate(['home']);
        }, err => {console.log(err);
                    this.LoginMessage = err.error;
                  });
    }
  }

  validateModel() {
    this.loginModel.email = this.loginForm.value.email;
    this.loginModel.password = this.loginForm.value.password;
    this.loginModel.remember = this.loginForm.value.remember;
  }

}
