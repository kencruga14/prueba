import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImagePostService } from 'src/app/services/utils/image-post.service';
import { Usuario } from '../../types/Usuario';

@Component({
  selector: 'crop-dialog',
  template: `
    <ngx-spinner bdColor="rgba(180,180,180,0.5)" size="large" color="#ff4242" type="ball-clip-rotate-multiple">
    <p style="color: rgb(26, 12, 12)"> <b>Espere por favor </b> </p>
    </ngx-spinner>
    <mat-dialog-content class="mat-typography">
      <h3>Recorta tu imagen</h3>
      <div>
    <image-cropper
        [imageChangedEvent]="imageChangedEvent"
        [maintainAspectRatio]="true"
        [aspectRatio]="1 / 1"
        [resizeToWidth]="256"
        [cropperMinWidth]="128"
        [cropperStaticWidth] = "735"
        [cropperStaticHeight] = "735"
        [onlyScaleDown]="true"
        [roundCropper]="false"
        [alignImage]="'left'"
        format="png"
        (imageCropped)="imageCropped($event)"
        (imageLoaded)="imageLoaded()"
    ></image-cropper>
</div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close (click)="send()">Enviar</button>
      &nbsp; &nbsp; &nbsp;
      <button mat-button mat-dialog-close (click)="cancel()">Cancelar</button>
    </mat-dialog-actions>
  `,
})
export class CropDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: File;
  showCropper = false;
  response: string = '';
  usuarioData: Usuario;

  onClose = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data,
                public dialogRef: MatDialogRef<CropDialogComponent>,
                private spinner: NgxSpinnerService,
                private imagePostService: ImagePostService
                ) {
    this.imageChangedEvent = data.imageChangedEvent;
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  imageLoaded(): void {
    this.spinner.hide();
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = this.base64ToFile(event.base64, "image");
  }

  send(): void {
    this.imagePostService.setImageUpload(this.croppedImage).subscribe( 
      e => {
          if (e.type === HttpEventType.UploadProgress) {}
          else if (e instanceof HttpResponse)
          this.onClose.emit("success");
          this.dialogRef.close();
      },
      err => {
        this.onClose.emit("error");
        this.dialogRef.close();
      }
    );
  }

  cancel(): void {
    this.onClose.emit("cancel");
    this.dialogRef.close();
  }

  base64ToFile(data, filename): File {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

}