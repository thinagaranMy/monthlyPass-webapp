import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeycloakService } from '../keycloak/keycloak.service'

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  roles: string[];
  createUser: boolean;
  scanPass: boolean;
  createRoute: boolean;
  subscribe: boolean;
  scanPassRole: boolean;
  createUserRole: boolean;
  createRouteRole: boolean;
  createSubcriptionRole: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.intializeRoles();
    this.roles = KeycloakService.getRoles();
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

  signOut(): void {
     KeycloakService.logout();
   }
}
