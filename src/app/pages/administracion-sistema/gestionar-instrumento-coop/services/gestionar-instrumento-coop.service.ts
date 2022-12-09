import { CatalogoInterface } from "./../../../../data/catalogo.interface";
import { InstrumentoCoopInterface } from "./../data/instrumento-coop.interface";
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GestionarInstrumentoCoopService {
  urlApiInstrumentoCoop = environment.urlGciService + "/instrumentocoop";

  //emite los datos a ser actualizados
  private itemSeleccionadoInstrumentoCoop!: InstrumentoCoopInterface;
  private itemInstrumentoCoop = new BehaviorSubject<InstrumentoCoopInterface>(
    this.itemSeleccionadoInstrumentoCoop
  );
  itemInstrumentoCoop$ = this.itemInstrumentoCoop.asObservable();

  //refresca la lista al agregar o actualizar
  private _refrescar$ = new Subject<void>();
  get refrescar$() {
    return this._refrescar$;
  }

  constructor(private http: HttpClient) {}

  //almacena el dato actual del instrumento de coop a ser actualizado.
  itemSeleccionado(itemSeleccionado: InstrumentoCoopInterface) {
    this.itemSeleccionadoInstrumentoCoop = itemSeleccionado;
    this.itemInstrumentoCoop.next(this.itemSeleccionadoInstrumentoCoop);
  }

  /**
   * MÉTODO GET
   * @returns lista de instrumento de cooperación
   */
  public obtenerInstrumentoCooperacion(): Observable<
    InstrumentoCoopInterface[]
  > {
    return this.http.get<InstrumentoCoopInterface[]>(
      this.urlApiInstrumentoCoop
    );
  }

  /**
   * MÉTODO GET
   * @returns catálogo de estado HABILITADO DESHABILITADO
   */
  public obtenerCatalogoEstado(): Observable<CatalogoInterface[]> {
    return this.http.get<CatalogoInterface[]>(
      this.urlApiInstrumentoCoop + "/catalogoTipoEstado"
    );
  }

  /**
   * METODO POST ARCHIVO
   * @param formData
   * @returns
   */

  public guardarInstrumentoCoop(
    formData: FormData
  ): Observable<HttpStatusCode> {
    return this.http
      .post<HttpStatusCode>(this.urlApiInstrumentoCoop, formData)
      .pipe(
        tap(() => {
          this._refrescar$.next();
        })
      );
  }

  /**
   * MÉTODO PUT
   * @param instrumentoCoop objeto a ser actuaizado
   * @returns  Http code  200, 500, 400 etc.
   */
  public actualizarInstrumentoCoop(
    formData: FormData
  ): Observable<HttpStatusCode> {
    return this.http
      .put<HttpStatusCode>(this.urlApiInstrumentoCoop, formData)
      .pipe(
        tap(() => {
          this._refrescar$.next();
        })
      );
  }

  /**
   * MÉTODO PUT   ACTUALIZAR SIN ARCHIVO
   * @param instrumentoCoop objeto a ser actuaizado
   * @returns  Http code  200, 500, 400 etc.
   */
  public actualizarInstrumentoCoopSinArchivo(
    intrumentoCoop: InstrumentoCoopInterface
  ): Observable<HttpStatusCode> {
    return this.http
      .put<HttpStatusCode>(
        this.urlApiInstrumentoCoop + "/sinArchivo",
        intrumentoCoop
      )
      .pipe(
        tap(() => {
          this._refrescar$.next();
        })
      );
  }

  /**
   * MÉTODO PATCH
   * @param id id del istrumento de cooperación a ser habilitado o deshabilitado
   * @param fechaMod fecha de modificación
   * @param userMod usuario que modificó
   * @returns
   */

  public habilitarDeshabilitarInstrumentoCoop(
    id: string,
    fechaMod: string,
    userMod: string
  ): Observable<HttpStatusCode> {
    return this.http
      .patch<HttpStatusCode>(
        this.urlApiInstrumentoCoop + "/" + id + "/" + fechaMod + "/" + userMod,
        {}
      )
      .pipe(
        tap(() => {
          this._refrescar$.next();
        })
      );
  }
}
