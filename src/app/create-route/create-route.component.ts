import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {
  origin: String;
  destination: String;
  locations: String[];
  createdRouteName: String;
  showCreatedRouteResult: boolean;
  showCreatedRouteResultFailed: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.initializeVariables();
     this.http.get(`http://localhost:8080/route/getAllLocation`)
      .subscribe(
        (data: any[]) => {
          this.locations = data;
          console.log(data);
        }
      );
  }

  initializeVariables() {
    this.origin = '';
    this.destination = '';
    this.createdRouteName= '';
    this.showCreatedRouteResult = false;
    this.showCreatedRouteResultFailed = false;
  }

  createRouteBtn(){
    this.showCreatedRouteResult = false;
    this.http.post(`http://localhost:8080/route/create`,
                  {
                    origin : this.origin,
                    destination : this.destination,

                  }
                  )
      .subscribe(
        (data: any) => {
          if(data && data.id !== null){
            this.initializeVariables();
            this.showPostiveResult(data.routeName);
          } else {
            this.initializeVariables();
            this.showNegativeResult();
          }
        }
      );
  }

  showPostiveResult(routeName: String) {
    this.createdRouteName =   routeName
    this.showCreatedRouteResult = true;
  }

  showNegativeResult(){
    this.showCreatedRouteResultFailed = true;
  }
}
