import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vex-modal-dialog',
  template: `
    <h2 mat-dialog-title>¡Aviso!</h2>
    <mat-dialog-content class="mat-typography">
      <h3>{{message}}</h3>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Ok</button>
    </mat-dialog-actions>
  `,
})
export class ModalDialogComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    this.message = data.message;
  }
}