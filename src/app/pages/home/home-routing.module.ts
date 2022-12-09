import { GestionarCierreComponent } from "./../gestionar-cierre/components/gestionar-cierre/gestionar-cierre.component";
import { GestionarRenovacionComponent } from "./../gestionar-renovacion/components/gestionar-renovacion/gestionar-renovacion.component";
import { GestionarSeguimientoComponent } from "./../gestionar-seguimiento/components/gestionar-seguimiento/gestionar-seguimiento.component";
import { GestionarSuscripcionComponent } from "./../gestionar-suscripcion/components/gestionar-suscripcion/gestionar-suscripcion.component";
import { GestionarEntidadComponent } from "./../administracion-sistema/gestionar-entidad/components/gestionar-entidad/gestionar-entidad.component";
import { GestionarInstrumentoCoopComponent } from "./../administracion-sistema/gestionar-instrumento-coop/components/gestionar-instrumento-coop/gestionar-instrumento-coop.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";

import { HomeComponent } from "./home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "gestionar-formato-instrumento-cooperacion",
    component: GestionarInstrumentoCoopComponent,
  },
  {
    path: "gestionar-entidad",
    component: GestionarEntidadComponent,
  },

  {
    path: "suscripcion",
    component: GestionarSuscripcionComponent,
  },
  {
    path: "seguimiento",
    component: GestionarSeguimientoComponent,
  },

  {
    path: "renovacion",
    component: GestionarRenovacionComponent,
  },

  {
    path: "cierre",
    component: GestionarCierreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class HomeRoutingModule {}
