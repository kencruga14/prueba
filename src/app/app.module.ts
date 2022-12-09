import { ApiInterceptorService } from "./interceptors/api-interceptor.service";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OAuthModule, OAuthService } from "angular-oauth2-oidc";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppLayoutModule } from "./layout/app-layout.module";
import { VexModule } from "../@vex/vex.module";

import { AuthService } from "./services/utils/auth.service";
import { ModalDialogModule } from "./components/modal-dialog/modal-dialog.module";

//Formularios reactivos
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Angular material
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import {MatCheckboxModule} from '@angular/material/checkbox';

//componentes
import { GestionarEntidadComponent } from "./pages/administracion-sistema/gestionar-entidad/components/gestionar-entidad/gestionar-entidad.component";
import { GestionarInstrumentoCoopComponent } from "./pages/administracion-sistema/gestionar-instrumento-coop/components/gestionar-instrumento-coop/gestionar-instrumento-coop.component";

import { GestionarCierreComponent } from "./pages/gestionar-cierre/components/gestionar-cierre/gestionar-cierre.component";
import { GestionarRenovacionComponent } from "./pages/gestionar-renovacion/components/gestionar-renovacion/gestionar-renovacion.component";
import { GestionarSeguimientoComponent } from "./pages/gestionar-seguimiento/components/gestionar-seguimiento/gestionar-seguimiento.component";
import { GestionarSuscripcionComponent } from "./pages/gestionar-suscripcion/components/gestionar-suscripcion/gestionar-suscripcion.component";

//FontAwesomeModule
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//
import { DatePipe } from "@angular/common";

//primeng
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    GestionarEntidadComponent,
    GestionarInstrumentoCoopComponent,
    
    GestionarCierreComponent,
    GestionarRenovacionComponent,
    GestionarSeguimientoComponent,
    GestionarSuscripcionComponent,
  ],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FontAwesomeModule,
    MatCheckboxModule,
    //primeng
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextModule,
    CardModule,

    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    VexModule,
    AppLayoutModule,
    ModalDialogModule,
    MatIconModule,
  ],
  providers: [
    AuthService,
    OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
