import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [ModalDialogComponent],
  exports: [ModalDialogComponent]
})
export class ModalDialogModule { }