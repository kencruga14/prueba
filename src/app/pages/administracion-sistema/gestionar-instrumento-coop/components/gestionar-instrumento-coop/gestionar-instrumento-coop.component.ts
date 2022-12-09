import { AuthService } from "src/app/services/utils/auth.service";
import { CatalogoInterface } from "./../../../../../data/catalogo.interface";
import { MensajeService } from "./../../../../../services/utils/mensaje.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { InstrumentoCoopInterface } from "./../../data/instrumento-coop.interface";
import { GestionarInstrumentoCoopService } from "./../../services/gestionar-instrumento-coop.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { UtilitiesService } from "src/app/services/utils/utilities.service";
import { Subscription } from "rxjs";

@Component({
  selector: "vex-gestionar-instrumento-coop",
  templateUrl: "./gestionar-instrumento-coop.component.html",
  styleUrls: ["./gestionar-instrumento-coop.component.scss"],
})
export class GestionarInstrumentoCoopComponent implements OnInit, OnDestroy {
  titulo = "INSTRUMENTO DE COOPERACIÓN";
  sistema = "Sistema de Gestión de Convenios Interinstitucionales";
  rolActual = "Administrador del sistema";
  modulo = "  Instrumento de cooperación  ";
  instrumentoCoopList: InstrumentoCoopInterface[] = [];
  loading: boolean = true;

  //dialog
  instrumentoCoopDialog: boolean;
  crearInstrumentoCoopForm: FormGroup;

  opcionesEstado: CatalogoInterface[] = [];
  suscripcion!: Subscription;
  tituloDialog = "CREAR";
  archivoSeleccionado = "";
  activarCheck = false;

  constructor(
    private gestionarInstrumentoCoopService: GestionarInstrumentoCoopService,
    public utilidadesService: UtilitiesService,
    private mensajeService: MensajeService,
    private authService: AuthService
  ) {
    this.suscripcion = this.gestionarInstrumentoCoopService
      .obtenerCatalogoEstado()
      .subscribe((data) => {
        this.opcionesEstado = data;
      });

    this.crearInstrumentoCoopForm = this.inicializarFormulario();
  }

  ngOnInit() {
    this.obtenerInstrumentoCoop();
    this.suscripcion =
      this.gestionarInstrumentoCoopService.refrescar$.subscribe(() => {
        this.obtenerInstrumentoCoop();
      });
  }

  inicializarFormulario(): FormGroup {
    let auxCrearForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256),
      ]),
      estado: new FormControl({ valor: "HABILITADO", nombre: "HABILITADO" }, [
        Validators.required,
      ]),
      checkActualizarArchivo: new FormControl(false),
    });
    return auxCrearForm;
  }

  obtenerInstrumentoCoop() {
    this.suscripcion = this.gestionarInstrumentoCoopService
      .obtenerInstrumentoCooperacion()
      .subscribe((data) => {
        this.instrumentoCoopList = data;
        this.loading = false;
      });
  }

  abrirNuevo() {
    this.tituloDialog = "CREAR";
    this.instrumentoCoopDialog = true;
  }

  rellenarCamposInstrumentoCoop(instrumentoCoop: InstrumentoCoopInterface) {
    this.abrirNuevo();
    this.tituloDialog = "ACTUALIZAR";
    //Llena el formulario
    this.crearInstrumentoCoopForm = new FormGroup({
      nombre: new FormControl(instrumentoCoop.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256),
      ]),
      estado: new FormControl(
        { valor: instrumentoCoop.estado, nombre: instrumentoCoop.estado },
        [Validators.required]
      ),
      checkActualizarArchivo: new FormControl(false),
    });
    this.activarCheck = true;
    this.gestionarInstrumentoCoopService.itemSeleccionado(instrumentoCoop);
  }

  habilitarDeshabilitarInstrumentoCoop(
    instrumentoCoop: InstrumentoCoopInterface
  ) {
    let status = this.mensajeService.alertasSweetConfirmacionRegistros(
      instrumentoCoop.estado == this.utilidadesService.ESTADO_HABILITADO
        ? "DESHABILITAR"
        : "HABILITAR",
      instrumentoCoop.estado == this.utilidadesService.ESTADO_HABILITADO
        ? "¿Está seguro de DESHABILITAR " + instrumentoCoop.nombre + "?"
        : "¿Está seguro de HABILITAR " + instrumentoCoop.nombre + "?"
    );
    if (status instanceof Promise) {
      status.then((response) => {
        if (response) {
          this.suscripcion = this.gestionarInstrumentoCoopService
            .habilitarDeshabilitarInstrumentoCoop(
              instrumentoCoop.id.toString(),
              this.utilidadesService.convertirDateToStringEnFormatoYYYYMMDD(
                new Date()
              ),
              this.authService.getPreferredName()
            )
            .subscribe(() => {
              this.mensajeService.alertasSweet2Simple(
                "success",
                instrumentoCoop.estado ===
                  this.utilidadesService.ESTADO_HABILITADO
                  ? "DESHABILITADO"
                  : "HABILITADO",
                instrumentoCoop.estado ===
                  this.utilidadesService.ESTADO_HABILITADO
                  ? "Se ha deshabilitado correctamente."
                  : "Se ha habilitado correctamente."
              );
            });
        }
      });
    }
  }

  ocultarDialogo() {
    this.instrumentoCoopDialog = false;
    this.crearInstrumentoCoopForm = this.inicializarFormulario();
    this.archivoSeleccionado = "";
    this.activarCheck = false;
  }

  changeInput(files: File[]) {
    let file = files[0];
    //actualiza el nombre del archivo seleccionado
    this.archivoSeleccionado = file === undefined ? "" : file.name;
  }

  guardarInstrumentoCoop() {
    const fileUpload = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    let file: File;
    file = fileUpload.files[0];

    if (file !== undefined && this.crearInstrumentoCoopForm.valid) {
      //Objeto
      let instrumentoCoopArchivo: InstrumentoCoopInterface = {
        nombre: this.crearInstrumentoCoopForm.value.nombre.toUpperCase(),
        estado: this.crearInstrumentoCoopForm.value.estado.valor,
        usuaCrea: this.authService.getPreferredName(),
        usuaMod: this.authService.getPreferredName(),
      };

      //archivo
      const blob = new Blob([file]);
      const formData = new FormData();
      formData.append("files", blob, file.name);
      formData.append("formulario", JSON.stringify(instrumentoCoopArchivo));

      //api
      this.suscripcion = this.gestionarInstrumentoCoopService
        .guardarInstrumentoCoop(formData)
        .subscribe(() => {
          this.ocultarDialogo();
          this.mensajeService.alertasSweet2Simple(
            "success",
            "¡Registro exitoso!",
            this.crearInstrumentoCoopForm.value.nombre +
              " se ha creado exitosamente."
          );
        });
    } else {
      this.mensajeService.alertasSweet2Simple(
        "warning",
        "Datos incompletos",
        "No ha escogido un archivo válido."
      );
    }
  }

  actualizarInstrumentoCoop() {
    if (this.crearInstrumentoCoopForm.value.checkActualizarArchivo) {
      const fileUpload = document.getElementById(
        "fileUpload"
      ) as HTMLInputElement;
      let file: File;
      file = fileUpload.files[0];
      if (file !== undefined && this.crearInstrumentoCoopForm.valid) {
        //obtiene el dato a ser actualizado
        let itemActualInstrumentoCoop$ =
          this.gestionarInstrumentoCoopService.itemInstrumentoCoop$;
        let datosActualizarInstrumentoCoop!: InstrumentoCoopInterface;
        itemActualInstrumentoCoop$.subscribe((data) => {
          datosActualizarInstrumentoCoop = data;
        });

        //Objeto
        let instrumentoCoop: InstrumentoCoopInterface = {
          id: datosActualizarInstrumentoCoop.id,
          nombre: this.crearInstrumentoCoopForm.value.nombre.toUpperCase(),
          estado: this.crearInstrumentoCoopForm.value.estado.valor,
          usuaCrea: datosActualizarInstrumentoCoop.usuaCrea,
          usuaMod: this.authService.getPreferredName(),
        };

        //archivo
        const blob = new Blob([file]);
        const formData = new FormData();
        formData.append("files", blob, file.name);
        formData.append("formulario", JSON.stringify(instrumentoCoop));

        //api
        this.suscripcion = this.gestionarInstrumentoCoopService
          .actualizarInstrumentoCoop(formData)
          .subscribe(() => {
            this.ocultarDialogo();
            this.mensajeService.alertasSweet2Simple(
              "success",
              "¡Actualización exitoso!",
              this.crearInstrumentoCoopForm.value.nombre +
                " se ha actualizado exitosamente."
            );
          });
      } else {
        this.mensajeService.alertasSweet2Simple(
          "warning",
          "Datos incompletos",
          "No ha escogido un archivo válido."
        );
      }
    } else {
      //Actualizar sin archivo
      if (this.crearInstrumentoCoopForm.valid) {
        //obtiene el dato a ser actualizado
        let itemActualInstrumentoCoop$ =
          this.gestionarInstrumentoCoopService.itemInstrumentoCoop$;
        let datosActualizarInstrumentoCoop!: InstrumentoCoopInterface;
        itemActualInstrumentoCoop$.subscribe((data) => {
          datosActualizarInstrumentoCoop = data;
        });

        //Objeto
        let instrumentoCoop: InstrumentoCoopInterface = {
          id: datosActualizarInstrumentoCoop.id,
          nombre: this.crearInstrumentoCoopForm.value.nombre.toUpperCase(),
          estado: this.crearInstrumentoCoopForm.value.estado.valor,
          usuaCrea: datosActualizarInstrumentoCoop.usuaCrea,
          usuaMod: this.authService.getPreferredName(),
        };

        //api
        this.suscripcion = this.gestionarInstrumentoCoopService
          .actualizarInstrumentoCoopSinArchivo(instrumentoCoop)
          .subscribe(() => {
            this.ocultarDialogo();
            this.mensajeService.alertasSweet2Simple(
              "success",
              "¡Actualización exitoso!",
              this.crearInstrumentoCoopForm.value.nombre +
                " se ha actualizado exitosamente."
            );
          });
      }
    }
  }

  descargar(urlDoc: string) {
    console.log(urlDoc);
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}
