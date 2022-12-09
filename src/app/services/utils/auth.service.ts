import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { defer, Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';

import { authConfig } from '../../config/oauth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {

    public getuserName: string;
    public urlRequest: string;

    constructor(private oauthService: OAuthService) {
        this.configureOauthService();
    }

    private configureOauthService() {
        this.oauthService.configure(authConfig);
        this.oauthService.tryLogin({});
    }

    public obtainAccessToken() {
        this.oauthService.initImplicitFlow();
    }

    public getUserNameObs(): Observable<string> {
        const claims = this.getUserClaims();
        this.getUserInfo();
        if (claims !== null) return defer(async () => await (claims['sub'].split('@')[0]));
    }




    public getUserName(): string {
        const claims = this.getUserClaims();
        this.getUserInfo();
        if (claims === null) {
           // return ''
            // window.location.reload()
        } else {
            return claims['sub'].split('@')[0];
        }
    }

    public getEmail(): string {
        const claims = this.getUserClaims();
        this.getUserInfo();
        if (claims === null) {
            // window.location.reload()
        } else {
            return claims['email'];
        }
    }

    public getFullName(): string {
        const claims = this.getUserClaims();
        this.getUserInfo();
        if (claims === null) {
            // window.location.reload()
        } else {
            return claims['name'];
        }
    }

    public getPreferredName(): string {
        const claims = this.getUserClaims();
        this.getUserInfo();
        if (claims === null) {
            // window.location.reload()
        } else {
            return claims['preferred_username'];
        }
    }

    public getUserInfo(): string {
        const idToken = this.oauthService.getIdToken();
        if (idToken === null) {
            // window.location.reload();
        } else {
            return typeof idToken['sub'] !== 'undefined' ? idToken['sub'].toString() : '';
        }
    }

    public capture(redirectable: string): void {
        this.oauthService.initImplicitFlow(redirectable);
    }

    public getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }

    public getUserClaims(): object {
        return this.oauthService.getIdentityClaims();
    }

    public isLoggedIn(): boolean {
        if (this.oauthService.getAccessToken() === null) return false;
        return true;
    }

    public logout(): void {
        this.oauthService.logOut();
    }

    public reloader(): void {
        this.oauthService.tryLogin({
            onTokenReceived: (info) => {
                window.location.reload();
                //window.location.href = info.state;
            }
        })
    }

    public redirection(): void {
        this.oauthService.tryLogin({
            onTokenReceived: (info) => {
                window.location.href = info.state;
            }
        })
    }

}