import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  faCheck,
  faDownload,
  faLock,
  faPen,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: "root",
})
export class UtilitiesService {
  CAMPO_OBLIGATORIO = "*";
  ESTADO_HABILITADO = "HABILITADO";
  ESTADO_DESHABILITADO = "DESHABILITADO";
  //iconos
  iconolock = faLock;
  iconofaCheck = faCheck;
  iconofaPen = faPen;
  iconoupload = faUpload;
  iconoDownload = faDownload;

  constructor(public datePipe: DatePipe) {}

  convertirDateToStringEnFormatoYYYYMMDD(fecha: Date) {
    let month = "" + (fecha.getMonth() + 1);
    let day = "" + fecha.getDate();
    let year = fecha.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  formatoFechaYYYYMMDD(fecha: string): any {
    let pipe = new DatePipe("en-US");
    let fechaFormato = pipe.transform(fecha, "yyyy-MM-dd");
    return fechaFormato;
  }

  formatoFechaDDMMYYYY(fecha: string): any {
    let pipe = new DatePipe("en-US");
    let fechaFormato = pipe.transform(fecha, "dd-MM-yyyy");
    return fechaFormato;
  }
}
