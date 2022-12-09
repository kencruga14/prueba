import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { LayoutModule } from '../../@vex/layout/layout.module';
import { SidebarModule } from '../../@vex/components/sidebar/sidebar.module';

import { AppLayoutComponent } from './app-layout.component';

import { SidenavModule } from '../components/sidenav/sidenav.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { ConfigPanelModule } from '../components/config-panel/config-panel.module';
import { FooterModule } from '../components/footer/footer.module';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    NgxSpinnerModule
  ]
})
export class AppLayoutModule {}
