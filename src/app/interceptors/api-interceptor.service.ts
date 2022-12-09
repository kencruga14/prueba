import { MensajeService } from "./../services/utils/mensaje.service";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private mensajeService: MensajeService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.mensajeService.alertasSweet2Simple(
            "error",
            "SOLICITUD INCORRECTA",
            error.error.message
          );
        }
        if (error.status === 401) {
          this.mensajeService.alertasSweetKeyRecoverConfirmationReturnLogin(
            ",error",
            " NO AUTORIZADO",
            error.error.message
          );
        }
        if (error.status === 403) {
          this.mensajeService.alertasSweet2Simple(
            "error",
            "SOLICITUD PROHIBIDA",
            error.error.message
          );
        }
        if (error.status === 404) {
          this.mensajeService.alertasSweet2Simple(
            "warning",
            "NO ENCONTRADO",
            error.error.message
          );
        }

        if (error.status === 409) {
          this.mensajeService.alertasSweet2Simple(
            "error",
            "CONFLICTO",
            error.error.message
          );
        }
        if (error.status === 500) {
          this.mensajeService.alertasSweet2Simple(
            "error",
            "ERROR INTERNO DEL SERVIDOR",
            error.error.message
          );
        }
        return throwError(error);
      })
    );
  }
}
