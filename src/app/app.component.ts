import { Component } from '@angular/core';
import { CreateUserComponent } from './create-user/create-user.component';
import { KeycloakHttp } from './keycloak/keycloak.http';
import { KeycloakService } from './keycloak/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Monthly Pass System';
   titleToken = 'User Information Obtained from the Token';
   titleAPIList = 'User List obtained via Keycloak HTTP API call';

   isTokenCardVisible: boolean = false;
   isAPICardsVisible: boolean = false;

   username: string;
   fullName: string;
   usersArray = [];

   constructor( private keycloakHttp: KeycloakHttp) {
   }

   signOut(): void {
     KeycloakService.logout();
   }

   reset(): void {
      this.isTokenCardVisible = false;
      this.isAPICardsVisible = false;
      this.usersArray = [];
   }
}


