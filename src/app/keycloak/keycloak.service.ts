import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
	static auth: any = {};
	static roles: Array<string>;
	static init(): Promise<any> {
		
		const keycloakAuth: any = Keycloak({
									url: environment.keycloakRootUrl,
									realm: environment.keyCloakRealm,
									clientId: environment.keycloakClient,
									'ssl-required': 'external',
									'public-client': true
				});

		KeycloakService.auth.loggedIn = false;
		
		return new Promise((resolve, reject) => {
			keycloakAuth.init({onLoad: 'login-required'})
				.success(() => {
					KeycloakService.auth.loggedIn = true;
					KeycloakService.auth.authz = keycloakAuth;
					KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
						+ '/realms/monthly_pass/protocol/openid-connect/logout?redirect_uri='
						+ document.baseURI;
					KeycloakService.roles = keycloakAuth.resourceAccess.web_client.roles;
					console.log(KeycloakService.roles);
					resolve();
					
				})
				.error(() => {
					reject();
				});
		});
	}

	static logout() {
		console.log('**  LOGOUT');
		KeycloakService.auth.loggedIn = false;
		KeycloakService.auth.authz = null;
		console.log(KeycloakService.auth.logoutUrl)
		window.location.href = KeycloakService.auth.logoutUrl;
		KeycloakService.auth = null;
		this.init();
	}

	static getUsername(): string {
		return KeycloakService.auth.authz.tokenParsed.preferred_username;
	}

	static getFullName(): string {
		return KeycloakService.auth.authz.tokenParsed.name;
	}

	static getRoles(): string[] {
		return this.roles;
	}

	getToken(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			if (KeycloakService.auth.authz.token) {
				KeycloakService.auth.authz
					.updateToken(5)
					.success(() => {
						resolve(<string>KeycloakService.auth.authz.token);
					})
					.error(() => {
						reject('Failed to refresh token');
					});
			} else {
				reject('Not logged in');
			}
		});
	}
}
