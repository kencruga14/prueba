import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ImageToolbarService {

  private _image: string = 'assets/updateData.png';

  get image(): string {return this._image;}
  set image(value: string) {this._image = value;}

}
