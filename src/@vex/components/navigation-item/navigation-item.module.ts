import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

import { NavigationItemComponent } from './navigation-item.component';
@NgModule({
  declarations: [NavigationItemComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    IconModule,
    MatIconModule,
    RouterModule,
    MatRippleModule
  ],
  exports: [NavigationItemComponent]
})
export class NavigationItemModule {
}
