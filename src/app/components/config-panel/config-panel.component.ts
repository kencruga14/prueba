import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';

import icCheck from '@iconify/icons-ic/twotone-check';
import icClose from '@iconify/icons-ic/twotone-close';
import icSettings from '@iconify/icons-ic/twotone-settings';

import { ConfigService } from '../../../@vex/services/config.service';
import { LayoutService } from '../../../@vex/services/layout.service';
import { Style, StyleService } from '../../../@vex/services/style.service';
import { ConfigName } from '../../../@vex/interfaces/config-name.model';

import { environment } from '../../../environments/environment';
import { ColorVariable } from './color-variables';

import { UsuarioService } from '../../services/usuario.service';
import { ImageToolbarService } from '../../services/utils/image-toolbar.service';

@Component({
  selector: 'config-panel',
  templateUrl:  './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss']
})
export class ConfigPanelComponent implements OnInit {

  configs = this.configService.configs;

  config$ = this.configService.config$;
  activeConfig$ = this.configService.config$.pipe(
    map(config => Object.keys(this.configService.configs).find(key => this.configService.configs[key] === config))
  );

  isRTL$ = this.route.queryParamMap.pipe(
    map(paramMap => coerceBooleanProperty(paramMap.get('rtl'))),
    first()
  );

  selectedStyle$ = this.styleService.style$;

  local: boolean = true;
  selector: string = "";
  query: string = "";

  icSettings = icSettings;
  icCheck = icCheck;
  icClose = icClose;
  ConfigName = ConfigName;
  Style = Style;

  initial: string = "";

  selectedColor: ColorVariable =  {
    light: 'rgba(0, 150, 136, 0.1)',
    default: 'rgb(0, 150, 136)',
    contrast: 'rgb(255, 255, 255)'
  };

  options: string[] = ["PIDM", "CEDULA", "MIESPE"];

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private layoutService: LayoutService,
              @Inject(DOCUMENT) private document: Document,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private imageToolbarService: ImageToolbarService,
              private router: Router,
              private snackBar: MatSnackBar
              ) {
                this.local = environment.local;
              }

  ngOnInit(): void {
    this.styleService.setStyle(Style.light);
    this.selectColor(this.selectedColor);
    this.initial = JSON.parse(atob(localStorage.getItem("mode")));
    if(this.initial === "active") this.enableDarkMode();
  }

  setConfig(layout: ConfigName, style: Style) {
    this.configService.setConfig(layout);
    this.styleService.setStyle(style);
  }

  selectColor(color: ColorVariable) {
    if (this.document) {
      this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
      this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
    }
  }

  isSelectedColor(color: ColorVariable) {
    return color === this.selectedColor;
  }

  enableDarkMode() {
    this.changeStepStyle("themes-black.css");
    this.styleService.setStyle(Style.dark);
    this.imageToolbarService.image='assets/upBlack.png';
    localStorage.setItem('mode', btoa(JSON.stringify("active")));
  }

  disableDarkMode() {
    this.changeStepStyle("themes-white.css");
    this.styleService.setStyle(Style.light);
    this.imageToolbarService.image='assets/updateData.png';
    localStorage.setItem('mode', btoa(JSON.stringify("inactive")));
  }

  sidenavOpenChange(change: MatSlideToggleChange) {
    change.checked ? this.layoutService.openSidenav() : this.layoutService.closeSidenav();
  }

  layoutRTLChange(change: MatSlideToggleChange) {
    change.checked ? this.layoutService.enableRTL() : this.layoutService.disableRTL();
  }

  changeStepStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) themeLink.href = styleName;
    else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }


  resetter(): void {
  }

  snackBarError(type: string, data: string ): void {
    const snackBarRef = this.snackBar.open(`ERROR: La combinación ${type}: ${data} no existe`, "X", {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success-dialog-white', 'bg-snackbar']
    });
  }
}