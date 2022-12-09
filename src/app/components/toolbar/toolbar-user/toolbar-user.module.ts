import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';

import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import { ToolbarUserComponent } from './toolbar-user.component';

@NgModule({
  declarations: [
    ToolbarUserComponent, 
    ToolbarUserDropdownComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
    IconModule
  ],
  exports: [ToolbarUserComponent],
  entryComponents: [ToolbarUserDropdownComponent]
})
export class ToolbarUserModule {}