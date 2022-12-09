import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, pipe, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../types/Usuario';
import { environment } from '../../environments/environment';
import { AuthService } from './utils/auth.service';
import { map } from 'rxjs/operators'
import {NavigationService } from '../../@vex/services/navigation.service';
const URL = environment.UrlService;
const USUARIOID = URL + '/usuarioid/';
const USUARIONAME = URL + '/usuarioname/';
const USUARIOCED = URL + '/usuarioced/';
const URL1 = 'https://espematico-api.espe.edu.ec/reporteWs';
const USER = URL1 + '/username/';

type SelectorType = 'PIDM' | 'CED' | 'USERNAME' | 'AUTH';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  public usuario$: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({});

  constructor(private http: HttpClient,
    private authService: AuthService, private navigation: NavigationService) { }

  public error: boolean = false;
  private _mainRole: string = "";
  private _toggleTest: boolean = false;
  public setteable: boolean = true;


  private errorHandler = pipe(
    catchError(() => {
      this.error = true;
      return of();
    }));

  public get mainRole() {
    return this._mainRole;
  }

  public set mainRole(mainRole: string) {
    this._mainRole = mainRole;
  }

  public get toggleTest() {
    return this._toggleTest
  }

  public set toggleTest(toggleTest: boolean) {
    this._toggleTest = toggleTest;
  }

  getUserByUsername(username: string) {
    return this.http.get(USER + username).pipe(
      map(
        (res: any) => {
          localStorage.setItem('idUser', res[0].id);
          this.menu(res[0].id);
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  menu(id) {
    this.navigation.findDataUser(id).subscribe((data) => {
    });
  }

}