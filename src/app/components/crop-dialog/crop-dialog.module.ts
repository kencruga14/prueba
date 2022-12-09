import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from "ngx-spinner";
import { CropDialogComponent } from './crop-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ImageCropperModule,
    NgxSpinnerModule
  ],
  declarations: [CropDialogComponent],
  exports: [CropDialogComponent]
})
export class CropDialogModule { }