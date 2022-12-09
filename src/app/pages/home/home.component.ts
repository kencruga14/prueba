import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

import icLeft from '@iconify/icons-fa-solid/align-left';
import icSearch from '@iconify/icons-fa-solid/search';
import icTick from '@iconify/icons-fa-solid/check';
import icCamera from '@iconify/icons-fa-solid/camera';
import icContact from '@iconify/icons-fa-solid/address-card';
import icDocument from '@iconify/icons-fa-solid/notes-medical';

import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { CropDialogComponent } from '../../components/crop-dialog/crop-dialog.component';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../types/Usuario';
import { AuthService } from 'src/app/services/utils/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInUp400ms]
})
export class HomeComponent implements OnInit {

  private _email: string;
  private _fullName:string;
  private _preferredName:string;

  public get email():string{
    return this._email;
  }

  public get fullName():string{
    return this._fullName;
  }

  public get preferredName():string{
    return this._preferredName;
  }

  constructor(private authService: AuthService) {
    this._email = this.authService.getEmail()
    this._fullName = this.authService.getFullName();
    this._preferredName = this.authService.getPreferredName();
  }

  ngOnInit(): void {
    this.authService.getUserName()
  }
}
