import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { ScanPassComponent } from './scan-pass/scan-pass.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import {KeycloakHttp, keycloakHttpFactory} from "./keycloak/keycloak.http";
import {HttpModule, RequestOptions, XHRBackend} from "@angular/http";

import {KeycloakService} from "./keycloak/keycloak.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';


const appRoutes: Routes = [
  { path: 'create-user' , component: CreateUserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    CreateUserFormComponent,
    ScanPassComponent,
    CreateRouteComponent,
    SubscribeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule
  ],
  providers: [ 
      {
        provide: KeycloakHttp,
        useFactory: keycloakHttpFactory,
        deps: [XHRBackend, RequestOptions, KeycloakService]
		  },
		  KeycloakService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
