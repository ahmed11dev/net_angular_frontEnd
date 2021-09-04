import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/register-model';
import { Users } from 'src/app/models/user';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private service:RegisterServiceService) { }

  userForm : FormGroup;
  reg: RegisterModel;
  regex : RegExp;

  registerationMessage:string;

  isBusy:boolean;

  messageValidate={
    userName:{
      required:'please add your username',
      usernameMatch: ''
    },
    email:{
      required:'please add your email',
      notValid:'please add valid email',
      emailMatch:''
    },

    password:{
      required:'please add your password',
      minLength:"minimum length is 5 char",
      notMatch:''
    },
    passwordConfirm:{
      required:'please Confirm your password',
      minLength:"minimum length is 5 char",
      isMatch:'please type same password'
    }
  };

  ngOnInit(): void {
    this.isBusy = false;

    this.registerationMessage ='';
    this.reg = {
      userName:'',
      email:'',
      password:''
    };

   this.userForm =this.fb.group({
    userName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(5)]],
    passwordConfirm:['',[Validators.required,Validators.minLength(5)]],
   });

   this.userForm.valueChanges.subscribe(x => {
      if (this.userForm.status == "VALID") {
          console.log("from valid");
          this.isBusy = true;
      }
   },err => console.log(err));

  }
  register(){
    if (this.userForm.valid) {
      this.validateRegisterModel();
      this.service.Register(this.reg).subscribe(succes => {
        this.userForm.reset();
        // this.ngOnInit();
        this.userForm.value.password ='';
        this.registerationMessage = "your new account added successfuly";
      },err => console.log(err.error));
    }
    console.log(this.userForm);
  }
  validateRegisterModel(){
    this.reg.userName = this.userForm.value.userName;
    this.reg.email = this.userForm.value.email;
    this.reg.password = this.userForm.value.password;
  }

  isPasswordMatch(){
    if (this.userForm.value.password !== "" && this.userForm.value.passwordConfirm !== ""){
      if (this.userForm.value.password !== this.userForm.value.passwordConfirm) {
        return true;
      }
    }
    return false;
  }

  isPasswordValid(){
    const password = this.userForm.value.password;
    if(password !== '' && password.length >= 5){
      this.regex = new RegExp('[a-z]');
      if (!this.regex.test(password)) {
          this.messageValidate.password.notMatch = "please add a-z char";
          return false
      }
      this.regex = new RegExp('[0-9]');
      if (!this.regex.test(password)) {
          this.messageValidate.password.notMatch = "please add any number";
          return false
      }

    }
    return true;
  }


  isUserNameExist(){
  const username = this.userForm.value.userName;
    if (username != null && username != '' && this.isBusy === false) {

      this.service.userNameExists(username).subscribe(successs => {
        console.log('name exists');
        this.messageValidate.userName.usernameMatch = 'this username is already exists';
       },err => console.log(err));

      //
      return true;
    }

        return false;
    }

    isEmailExist(){
      const email = this.userForm.value.email;
      if (email != null && email != '' && this.isBusy === false) {

        this.service.userNameExists(email).subscribe(successs => {
          console.log('email exists');
          this.messageValidate.userName.usernameMatch = 'this username is already exists';
         },err => console.log(err));

        //
        return true;
      }
      return false;
    }
}
