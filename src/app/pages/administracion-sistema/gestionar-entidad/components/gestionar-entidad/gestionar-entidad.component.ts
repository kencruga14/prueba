import { CatalogoInterface } from "src/app/data/catalogo.interface";
import { MensajeService } from "./../../../../../services/utils/mensaje.service";
import { GestionarEntidadService } from "./../../services/gestionar-entidad.service";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { EntidadInterface } from "./../../data/entidad.interface";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UtilitiesService } from "src/app/services/utils/utilities.service";
import { AuthService } from "src/app/services/utils/auth.service";

@Component({
  selector: "vex-gestionar-entidad",
  templateUrl: "./gestionar-entidad.component.html",
  styleUrls: ["./gestionar-entidad.component.scss"],
})
export class GestionarEntidadComponent implements OnInit, OnDestroy {
  titulo = "ENTIDAD";
  sistema = "Sistema de Gestión de Convenios Interinstitucionales";
  rolActual = "Administrador del sistema";
  modulo = "  Entidad  ";
  entidadList: EntidadInterface[] = [];
  loading: boolean = true;

  //dialog
  entidadDialog: boolean;
  entidadForm: FormGroup;

  opcionesTipoEntidad: CatalogoInterface[] = [];
  suscripcion!: Subscription;
  tituloDialog = "CREAR";
  constructor(
    private gestionarEntidadService: GestionarEntidadService,
    public utilidadesService: UtilitiesService,
    private mensajeService: MensajeService,
    private authService: AuthService
  ) {
    this.entidadForm = this.inicializarFormulario();
    this.obtenerTipoEntidadCatalogo();
  }

  ngOnInit(): void {
    this.obtenerEntidad();
    this.suscripcion = this.gestionarEntidadService.refrescar$.subscribe(() => {
      this.obtenerEntidad();
    });
  }

  inicializarFormulario(): FormGroup {
    let auxForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256),
      ]),
      tipo: new FormControl("", [Validators.required]),
    });
    return auxForm;
  }

  obtenerEntidad() {
    this.suscripcion = this.gestionarEntidadService
      .obtenerEntidades()
      .subscribe((data) => {
        this.entidadList = data;
        this.loading = false;
      });
  }

  obtenerTipoEntidadCatalogo() {
    this.suscripcion = this.gestionarEntidadService
      .obtenerTipoEntidadCatalogo()
      .subscribe((data) => {
        this.opcionesTipoEntidad = data;
      });
  }

  abrirNuevo() {
    this.tituloDialog = "CREAR";
    this.entidadDialog = true;
  }

  rellenarCamposEntidad(entidad: EntidadInterface) {
    this.abrirNuevo();
    this.tituloDialog = "ACTUALIZAR";

    this.entidadForm = new FormGroup({
      nombre: new FormControl(entidad.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256),
      ]),
      tipo: new FormControl({ valor: entidad.tipo, nombre: entidad.tipo }, [
        Validators.required,
      ]),
    });

    this.gestionarEntidadService.itemSeleccionado(entidad);
  }

  ocultarDialogo() {
    this.entidadDialog = false;
    this.entidadForm = this.inicializarFormulario();
  }

  guardarEntidad() {
    if (this.entidadForm.valid) {
      let entidad: EntidadInterface = {
        nombre: this.entidadForm.value.nombre.toUpperCase(),
        tipo: this.entidadForm.value.tipo.valor,
        usuaCrea: this.authService.getPreferredName(),
        usuaMod: this.authService.getPreferredName(),
      };

      this.suscripcion = this.gestionarEntidadService
        .guardarEntidad(entidad)
        .subscribe(() => {
          this.ocultarDialogo();
          this.mensajeService.alertasSweet2Simple(
            "success",
            "¡Registro exitoso!",
            this.entidadForm.value.nombre + " se ha creado exitosamente."
          );
        });
    }
  }

  actualizarEntidad() {
    if (this.entidadForm.valid) {
      //obtiene el dato a ser actualizado
      let itemActualEntidad$ = this.gestionarEntidadService.itemEntidad$;
      let datosActualizarEntidad!: EntidadInterface;
      itemActualEntidad$.subscribe((data) => {
        datosActualizarEntidad = data;
      });
      //contruye el objeto
      let entidad: EntidadInterface = {
        id: datosActualizarEntidad.id,
        nombre: this.entidadForm.value.nombre.toUpperCase(),
        tipo: this.entidadForm.value.tipo.valor,
        usuaCrea: datosActualizarEntidad.usuaCrea,
        usuaMod: this.authService.getPreferredName(),
      };

      this.suscripcion = this.gestionarEntidadService
        .actualizarEntidad(entidad)
        .subscribe(() => {
          this.ocultarDialogo();
          this.mensajeService.alertasSweet2Simple(
            "success",
            "¡Actualización exitoso!",
            this.entidadForm.value.nombre + " se ha actualizado exitosamente."
          );
        });
    }
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}
