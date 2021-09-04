import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private services : RegisterServiceService,
              private route : Router,
              private auth: AuthService
              ) { }

  title = 'Cinma Movies';

  ngOnInit(): void {
    if (localStorage.getItem('email') != null && localStorage.getItem('expire') != null && localStorage.getItem('role') != null){
      if(this.auth.checkStorage()){
        this.logout();
      }
    }
  }

  logout(){

    this.services.logout().subscribe(succ => {
      localStorage.clear();

      this.route.navigate(['home']);
    },err => console.log(err));

  }

  isUserRegisterd(){
    const email = !!localStorage.getItem('email');
    if(email){
      return true;
    }
    return false;
  }
}
