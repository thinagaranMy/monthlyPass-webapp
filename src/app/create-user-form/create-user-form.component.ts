import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {
  name: String ;
  cardId: String;
  email: String;
  phoneNumber: String;
  userCreated: boolean;
  createUserName: String;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern =   "^[0-9]{9,12}$";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.name = '';
    this.cardId= '';
    this.email= '';
    this.phoneNumber= '';
    this.createUserName= '';
    this.userCreated= false;

  }

  submitButtonClicked(){
    this.http.post(`http://localhost:8080/customer/create`,
                  {
                    name : this.name,
                    phoneNumber : this.phoneNumber,
                    email : this.email,
                    cardId : this.cardId
                  }
                  )
      .subscribe(
        (data: any) => {
          if(data && data.id !== null){
            this.showResultPostive(data.name);
          }
          console.log(data);
        }
      );
  }
  showResultPostive(name){
    this.ngOnInit();
    this.userCreated= true;
     this.createUserName= name;

  }
  log(x) { console.log(x); }
  
}
