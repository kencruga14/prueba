import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PopoverService } from "../../../../@vex/components/popover/popover.service";
import { ToolbarUserDropdownComponent } from "./toolbar-user-dropdown/toolbar-user-dropdown.component";

import icPerson from "@iconify/icons-ic/twotone-person";

import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../types/Usuario";
import { AuthService } from "src/app/services/utils/auth.service";

@Component({
  selector: "app-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserComponent {
  usuario$: BehaviorSubject<Usuario> | Observable<Usuario>;
  dropdownOpen: boolean;
  icPerson = icPerson;
  counter: number = 0;
  usuario: Usuario;
  public isLoggedIn = false;
  public userName: string;
  public pictureUser: string;
  public userData: Usuario;

  constructor(
    private popover: PopoverService,
    private authService: AuthService,
    public usuarioService: UsuarioService,
    private cd: ChangeDetectorRef
  ) {
    this.usuario$ = this.usuarioService.usuario$;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    //this.userData = this.usuarioService.getUserByUsername();

    if (this.isLoggedIn) {
      this.getInfoUser(this.authService.getUserName());
    }
  }

  getInfoUser(username) {
    this.usuarioService.getUserByUsername(username).subscribe((data) => {
      if (data) {
        this.userData = {
          nombres: this.authService.getFullName(),
          urlFoto: data[0].urlFoto,
        };
      }
    });
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
