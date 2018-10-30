import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Route } from '../model/route.model';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  users: User[];
  routes: Route[];
  route: String;
  user: String;
  month: String;
  year: String;
  successName: String;
  successRoute: String;
  successMonth: String;
  showSubscriptionSuccessBool: Boolean;
  months : String[] = [ "JANUARY",
                        "FEBRUARY",
                        "MARCH",
                        "APRIL",
                        "MAY",
                        "JUNE",
                        "JULY",
                        "AUGUST",
                        "SEPTEMBER",
                        "OCTOBER",
                        "NOVEMBER",
                        "DECEMBER"
                      ];
  years: String[] = [   "2018", 
                        "2019", 
                        "2020", 
                        "2021"
                    ];
  constructor(private http: HttpClient) { }

  initializeVariables(){
    this.user = '';
    this.month = '';
    this.year = '';
    this.successName = '';
    this.showSubscriptionSuccessBool = false;
    this.successRoute = '';
    this.successMonth = '';
  }
  ngOnInit() {
    this.http.get(`http://localhost:8080/customer/getAll`)
      .subscribe(
        (data :any[]) => {
          if(data.length){
            this.users = data;
          }
        }
      );

    this.http.get(`http://localhost:8080/route/getAll`)
      .subscribe(
        (data: any[]) => {
          if(data.length){
            this.routes = data;
          }
        }
      );
  }

  createSubscription() {
    console.log(this.user);
    console.log(this.route);
    return this.http.post(`http://localhost:8080/customer/createNewSubscription/`,
                          {
                            cardId : this.user,
                            month : this.month,
                            year : this.year,
                            routeName : this.route
                          })
    .subscribe(
      (data:any) => {
        if(data && data.id !== null){
          console.log(data);
          this.showSubscriptionSuccess(data.customerEntity.name, data.routeEntity.routeName, data.month)
        }
      }
    );
  }
  showSubscriptionSuccess(customerName, routeName, month){
    this.successName = customerName;
    this.successRoute = routeName;
    this.successMonth = month;
    this.showSubscriptionSuccessBool = true;
  }

}
