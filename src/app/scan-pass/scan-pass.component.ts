import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '../model/route.model';

@Component({
  selector: 'scan-pass',
  templateUrl: './scan-pass.component.html',
  styleUrls: ['./scan-pass.component.css']
})
export class ScanPassComponent implements OnInit {
  routeName: String ;
  routes: Route[];
  route: String;
  cardId: String ;
  tripCreated: boolean;
  initial: boolean = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
   this.resetScan();
   this.routeName = '';
   this.http.get(`http://localhost:8080/route/getAll`)
      .subscribe(
        (data: Route[]) => {
          this.routes = data;
          console.log(this.routes);
        }
      );
  }

  submitButtonClicked(){
    this.initial = false;
    this.http.post(`http://localhost:8080/trip/create/`+this.cardId+`/`+this.routeName,
                  {})
      .subscribe(
        (data: any) => {
          if(data){
            if(data.id === null){
              this.tripCreated = false;
            }else {
              console.log('trip created with id' + data.id);
              this.tripCreated = true;
            }
          }
        }
      );
    this.resetScan();
  }

  resetScan(): void {
    this.cardId = '' ;
    this.tripCreated = false;
  }

  chooseRoute(): void {
    this.routeName = this.route;
  }

  resetRoute(): void {
    this.ngOnInit();
  }
}
