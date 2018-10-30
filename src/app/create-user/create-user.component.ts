import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeycloakService } from '../keycloak/keycloak.service'

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles: string[];
  createUser: boolean;
  scanPass: boolean;
  createRoute: boolean;
  subscribe: boolean;
  scanPassRole: boolean;
  createUserRole: boolean;
  createRouteRole: boolean;
  createSubcriptionRole: boolean;

  constructor(
  ) { }
  ngOnInit() {
    this.intializeRoles();
    this.roles = KeycloakService.getRoles();
    console.log(this.roles);
    this.createUser= false;
    this.scanPass = false;
    this.createRoute = false;
    this.subscribe =false;
    this.initializeMenu();
  }

  intializeRoles() {
    this.scanPassRole = false;
    this.createUserRole = false;
    this.createRouteRole = false;
    this.createSubcriptionRole = false;
  }
  initializeMenu() {
    if(this.roles.includes('scan-pass')){
      this.scanPassRole = true;
    }
    if(this.roles.includes('create-user')){
      this.createUserRole = true;
    }
    if(this.roles.includes('create-route')) {
      this.createRouteRole = true;
    }
    if(this.roles.includes('create-subcription')) {
      this.createSubcriptionRole = true;
    }

    if(this.roles.includes('scan-pass-only')) {
      this.scanPass = true
    }

  }
  createUserFnct() {
    this.ngOnInit();
    this.createUser = true;
  }
  scanPassFnct(){
    this.ngOnInit();
    this.scanPass = true;
  }

  createRouteFnct(){
    this.ngOnInit();
    this.createRoute = true;
  }

  subscribeFnct(){
    this.ngOnInit();
    this.subscribe = true;
  }
  test(){
    console.log('Test');
  }
}
 