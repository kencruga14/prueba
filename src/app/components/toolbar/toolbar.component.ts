import { Component, HostBinding, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import icMenu from '@iconify/icons-ic/twotone-menu';

import { LayoutService } from '../../../@vex/services/layout.service';
import { ConfigService } from '../../../@vex/services/config.service';
import { NavigationService } from '../../../@vex/services/navigation.service';
import { ImageToolbarService } from '../../services/utils/image-toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));

  icMenu = icMenu;

  constructor(private layoutService: LayoutService,
              private configService: ConfigService,
              private navigationService: NavigationService,
              public imageToolbarService: ImageToolbarService) { }
  openSidenav() {
    this.layoutService.openSidenav();
  }

}