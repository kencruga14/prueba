import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import icPerson from '@iconify/icons-ic/twotone-person';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/utils/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/types/Usuario';

@Component({
  selector: 'app-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent  {

  usuario$: BehaviorSubject<Usuario> | Observable<Usuario>;
  icPerson = icPerson;

  constructor(
      private authService: AuthService,
      public usuarioService: UsuarioService) {
        this.usuario$ = this.usuarioService.usuario$;
      }

  logout(): void  {
    this.authService.logout();
  }
}