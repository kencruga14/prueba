import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, startWith } from 'rxjs/operators';

import { SidebarComponent } from '../../@vex/components/sidebar/sidebar.component';
import { LayoutService } from '../../@vex/services/layout.service';
import { checkRouterChildsData } from '../../@vex/utils/check-router-childs-data';
import { ConfigService } from '../../@vex/services/config.service';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../types/Usuario';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  styles: [`
    .disabled {
      pointer-events: none;
      opacity: 0.5;
      background: #CCC;
    }
  `],
  template: `
      <ngx-spinner bdColor="rgba(180,180,180,0.5)" size="large" color="#ff4242" type="ball-clip-rotate-multiple">
      <p style="color: rgb(26, 12, 12)"> <b>Espere por favor </b> </p>
    </ngx-spinner>
    <ng-template #sidenavRef>
      <app-sidenav [ngClass]="{'disabled':terms}" [collapsed]="sidenavCollapsed$ | async"></app-sidenav>
    </ng-template>
    <ng-template #toolbarRef>
      <app-toolbar [hasShadow]="toolbarShadowEnabled$ | async" [mobileQuery]="!(isDesktop$ | async)"
                  class="vex-toolbar"></app-toolbar>
    </ng-template>
    <ng-template #footerRef>
      <app-footer *ngIf="isFooterVisible$ | async" class="vex-footer"></app-footer>
    </ng-template>
    <vex-layout [footerRef]="footerRef" [sidenavRef]="sidenavRef" [toolbarRef]="toolbarRef"></vex-layout>
    <vex-sidebar #configpanel [invisibleBackdrop]="true" position="right">
      <config-panel></config-panel>
    </vex-sidebar>
  `,
})
export class AppLayoutComponent implements OnInit, DoCheck {

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled))
  );

  @ViewChild('configpanel', { static: true }) configpanel: SidebarComponent;

  terms: boolean;
  userName: string;
  usuarioData: Usuario;

  constructor(private layoutService: LayoutService,
              private configService: ConfigService,
              private breakpointObserver: BreakpointObserver,
              private usuarioService: UsuarioService,
              private router: Router) {}

  ngOnInit(): void {
    this.layoutService.configpanelOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.configpanel.open() : this.configpanel.close());
  }
  ngDoCheck(): void {
    if(this.usuarioService.toggleTest) {
      this.ngOnInit();
      this.usuarioService.toggleTest = false;
    }
  }
}
