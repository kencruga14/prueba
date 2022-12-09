import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationService } from 'src/@vex/services/navigation.service';

import { ConfigService } from '../@vex/services/config.service';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';

import { AuthService } from './services/utils/auth.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'vex-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  title = 'vex';
  isLoggedIn = false;
  menuItems = [];
  userNameLowerCase$: Observable<string>;

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private authService: AuthService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService,
    private router: Router,
    private navigationService: NavigationService,
  ) {
   // this.menuItems = JSON.parse(localStorage.getItem('menu'));

    this.navigationService.items = [
      {
        type: 'link',
        label: 'Instrumento de Cooperación',
        route: '/gestionar-formato-instrumento-cooperacion',
        icon: 'delete',
      },
      {
        type: 'link',
        label: 'Entidades',
        route: '/gestionar-entidad',
        icon: 'location_city',
      },
      {
        type: 'link',
        label: 'Unidades Impulsadoras',
        route: '/gestionar-unidad-impulsadora',
        icon: 'task_alt',
      },
      {
        type: 'link',
        label: 'Usuarios y roles ',
        route: '/usuarios-roles',
        icon: 'group_add'
      },
        {
        type: 'link',
        label: 'Suscripción',
        route: '/suscripcion',
        icon: 'description',
      },
      {
        type: 'link',
        label: 'Seguimiento',
        route: '/seguimiento',
        icon: 'task',
      },
      {
        type: 'link',
        label: 'Renovación',
        route: '/renovacion',
        icon: 'folder_open',
      },
{
        type: 'link',
        label: 'Cierre',
        route: '/cierre',
        icon: 'inventory_2',
      },
        ]

    if (this.platform.BLINK)
      this.renderer.addClass(this.document.body, 'is-blink');

    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

    //this.navigationService.items = this.menuItems;


    this.configService.setConfig(ConfigName.ares);
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.authService.capture(window.location.href);
      this.login();
      return;
    }

    this.authService.redirection();
    //this.authService.reloader();
  }


  login(): void {
    this.authService.obtainAccessToken();
  }




}