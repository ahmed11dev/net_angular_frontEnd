import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-registerconfirm',
  templateUrl: './registerconfirm.component.html',
  styleUrls: ['./registerconfirm.component.css']
})
export class RegisterconfirmComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private service:RegisterServiceService
              ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      const id = param['ID'];
      const token = param['Token'];
      if (id && token) {
        console.log('id=' + id + ' Token :' + token);
        this.service.emailConfirm(id,token).subscribe(success => {
          console.log(success);
        },err => console.log(err));
      }
    }, exeption => console.log(exeption));
  }

}
