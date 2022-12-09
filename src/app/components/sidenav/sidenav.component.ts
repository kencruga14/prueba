import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';

import { trackByRoute } from '../../../@vex/utils/track-by';
import { LayoutService } from '../../../@vex/services/layout.service';
import { ConfigService } from '../../../@vex/services/config.service';
import { NavigationItem } from '../../../@vex/interfaces/navigation-item.interface';

import { UsuarioService } from '../../services/usuario.service';
import { navigationStudents, navigationEmployees, 
          navigationRootItems, navigationMil } from './navigation-items';
import { Usuario } from '../../types/Usuario';


import { NavigationService } from 'src/@vex/services/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;

  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));
  
  items = this.navigationService.items;
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;

  employees: NavigationItem[] = [
    navigationRootItems,
    {
      type: 'subheading',
      label: 'Actualización de Datos',
      children: navigationEmployees
    }
  ];

  students: NavigationItem[] = [
    navigationRootItems,
    {
      type: 'subheading',
      label: 'Actualización de Datos',
      children: navigationStudents
    }
  ];

  mil: NavigationItem[] = [
    navigationRootItems,
    {
      type: 'subheading',
      label: 'Actualización de Datos',
      children: navigationMil
    }
  ];
  

  // items = [];
  usuario$: BehaviorSubject<Usuario> | Observable<Usuario>;

  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              private configService: ConfigService,
              private usuarioService: UsuarioService) {

                this.usuario$ = this.usuarioService.usuario$;
            }

  ngOnInit(): void {
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
}





// import { Component, Input, OnInit } from '@angular/core';
// import { trackByRoute } from 'src/@vex/utils/track-by';
// import { NavigationService } from 'src/@vex/services/navigation.service';
// import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
// import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
// import { LayoutService } from 'src/@vex/services/layout.service';
// import { ConfigService } from 'src/@vex/services/config.service';
// import { map } from 'rxjs/operators';




// @Component({
//   selector: 'app-sidenav',
//   templateUrl: './sidenav.component.html',
//   styleUrls: ['./sidenav.component.scss']
// })
// export class SidenavComponent implements OnInit {

//   @Input() collapsed: boolean;
//   collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
//   title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
//   imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
//   showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));

//   items = this.navigationService.items;
//   trackByRoute = trackByRoute;
//   icRadioButtonChecked = icRadioButtonChecked;
//   icRadioButtonUnchecked = icRadioButtonUnchecked;

//   constructor(private navigationService: NavigationService,
//               private layoutService: LayoutService,
//               private configService: ConfigService) { }

//   ngOnInit() {
//   }

//   onMouseEnter() {
//     this.layoutService.collapseOpenSidenav();
//   }

//   onMouseLeave() {
//     this.layoutService.collapseCloseSidenav();
//   }

//   toggleCollapse() {
//     this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
//   }
// }
