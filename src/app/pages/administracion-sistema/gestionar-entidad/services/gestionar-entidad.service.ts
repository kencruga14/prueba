import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { EntidadInterface } from "./../data/entidad.interface";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CatalogoInterface } from "src/app/data/catalogo.interface";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GestionarEntidadService {
  urlApi = environment.urlGciService + "/entidad";

  //emite los datos a ser actualizados
  private itemSeleccionadoEntidad!: EntidadInterface;
  private itemEntidad = new BehaviorSubject<EntidadInterface>(
    this.itemSeleccionadoEntidad
  );
  itemEntidad$ = this.itemEntidad.asObservable();

  //refresca la lista al agregar o actualizar
  private _refrescar$ = new Subject<void>();
  get refrescar$() {
    return this._refrescar$;
  }

  constructor(private http: HttpClient) {}

  //almacena el dato actual de la Entidad a ser actualizado.
  itemSeleccionado(itemSeleccionado: EntidadInterface) {
    this.itemSeleccionadoEntidad = itemSeleccionado;
    this.itemEntidad.next(this.itemSeleccionadoEntidad);
  }

  /**
   * MÉTODO GET
   * @returns lista de unidad impulsadora
   */
  public obtenerEntidades(): Observable<EntidadInterface[]> {
    return this.http.get<EntidadInterface[]>(this.urlApi);
  }

  /**
   * MÉTODO GET
   * @returns catálogo
   */
  public obtenerEntidadCatalogo(): Observable<CatalogoInterface[]> {
    return this.http.get<CatalogoInterface[]>(this.urlApi + "/catalogo");
  }


  /**
   * MÉTODO GET
   * @returns catálogo tipo de entidad 
   */
   public obtenerTipoEntidadCatalogo(): Observable<CatalogoInterface[]> {
    return this.http.get<CatalogoInterface[]>(this.urlApi + "/tipo/catalogo");
  }



  /**
   *MÉTODO POST
   * @param entidad Objeto con los datos a guardar
   * @returns Http code  200, 500, 400 etc.
   */

  public guardarEntidad(entidad: EntidadInterface): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(this.urlApi, entidad).pipe(
      tap(() => {
        this._refrescar$.next();
      })
    );
  }

  /**
   * MÉTODO PUT
   * @param entidad objeto a ser actuaizado
   * @returns  Http code  200, 500, 400 etc.
   */
  public actualizarEntidad(
    entidad: EntidadInterface
  ): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(this.urlApi, entidad).pipe(
      tap(() => {
        this._refrescar$.next();
      })
    );
  }
}
