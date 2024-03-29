import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation.component';

import { NavigationItemModule } from '../navigation-item/navigation-item.module';
import { ContainerModule } from '../../../@vex/directives/container/container.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    IconModule,
    RouterModule,
    NavigationItemModule,
    ContainerModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule {
}
