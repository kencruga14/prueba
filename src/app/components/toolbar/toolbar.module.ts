import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarUserModule } from './toolbar-user/toolbar-user.module';
import { NavigationModule } from '../../../@vex/components/navigation/navigation.module';
import { NavigationItemModule } from '../../../@vex/components/navigation-item/navigation-item.module';
import { ContainerModule } from '../../../@vex/directives/container/container.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    ToolbarUserModule,
    IconModule,
    NavigationModule,
    RouterModule,
    NavigationItemModule,
    ContainerModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}